import boto3
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key



class DynamoDBHandler:
    def __init__(self, endpoint="http://localhost:8000", region="localhost") -> None:
        self.endpoint = endpoint
        self.region = region
        self.dynamodb = None
        print("Initializing Dynamo DB Handler. endpoint:{0} region:{1}".format(endpoint, region))

    def get_client(self):
        if self.dynamodb:
            return self.dynamodb
        else:
            self.dynamodb = boto3.resource('dynamodb', endpoint_url=self.endpoint, region_name=self.region)
            return self.dynamodb
 
    def add_record(self, table_name, record):
        """
        Adds a record to a table.

        :param table: The table name.
        :param record: dictionary of a single record.
        """
        try:
            client = self.get_client()
            table = client.Table(table_name)
            table.put_item(Item=record)

        except ClientError as err:
            print(err)
            raise


    def get_record(self, table_name, query):
        """
        Get a record to a table.

        :param table: The table name.
        :param query: query .
        """
        try:
            client = self.get_client()
            table = client.Table(table_name)
            response = table.query(KeyConditionExpression=Key('GeoID').eq(query))
            if response["Count"]>0:
                return response["Items"][0]
            else:
                return {}

        except ClientError as err:
            print(err)
            raise
    
    def scan_table(self, table_name, expression=""):
        """
        Adds a record to a table.

        :param table: The table name.
        :param record: dictionary of a single record.
        """
        try:
            client = self.get_client()
            table = client.Table(table_name)
            # if expression:
            #     response = table.scan(ProjectionExpression=expression)
            # else:
            response = table.scan()
            return response

        except ClientError as err:
            print(err)
            raise
    
    def get_config(self, table_name, config_name):
        try:
            client = self.get_client()
            print("Trying to fetch configuration {0} with key {1}".format(table_name, config_name))
            table = client.Table(table_name)
            response = table.query(KeyConditionExpression=Key('ConfigID').eq(config_name))
            print(response["Items"][0]["value"])
            return response["Items"][0]["value"]

        except ClientError as err:
            print(err)
            raise
    
    def get_indicators(self, table_name, geoID):
        try:
            # print("Getting indicator from table {0} and county {1}".format(table_name, geoID))
            client = self.get_client()
            table = client.Table(table_name)
            response = table.query(KeyConditionExpression=Key('GeoID').eq(geoID))
            if response["Count"] == 0:
                return {"GeoID": geoID, "Percentage": "0%"}
            else:
                return response["Items"][0]
        except ClientError as err:
            print(err)
            raise
    
    def get_muni_data(self, geoID):
        results = []
        results.append("ESG Envinronmental Data:")
        
        drought_results = self.get_record("drought",geoID)
        if "GeoID" in drought_results:   
            drought_results["Indicator"]="drought"
            results.append(drought_results)
        fire_results = self.get_record("fire",geoID)
        if "GeoID" in fire_results:   
            fire_results["Indicator"]="fire"
            results.append(fire_results)
        results.append("ESG Social Data:")
        demographics_results = self.get_record("demographics",geoID)
        if "GeoID" in demographics_results:
            demographics_results["Indicator"] = "demographics"
            results.append(demographics_results)
        race_results = self.get_record("race",geoID)
        if "GeoID" in race_results:
            race_results["Indicator"] = "race"
            results.append(race_results)
        return results