import json
import logging
from json import JSONEncoder
from common.dynamodb import DynamoDBHandler
from common.esg import ESGRating, ESGArgument, ESGType, ESGCounty

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def cors_headers(event, context):
    logger.debug("HTTP OPTIONS: Returning CORDS Headers")
    return {
        'statusCode': 200,
        'headers' : {
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,HEAD,PUT,DELETE,PATCH'
            
        },
        'body': json.dumps('Hello there!')
    }

def hello(event, context):
    body = {
        "message": "Go Serverless v1.0! Your function executed successfully!",
        "input": event
    }

    response = {
        "statusCode": 200,
        "body": json.dumps(body)
    }

    return response


def get_rating_by_params(event, context):
    logger.debug("Start - get_rating_by_params()")
    message = None
    message_code = None
    try:
        fromJSON = json.loads(event['body'])
        logger.info(fromJSON)
    except Exception as e:
        print(e)
        logger.error(e)
        message_code= -1
        message="error " + str(e)
        
    body = {
        "code": message_code,
        "message": message
    }

    response = {
        "statusCode": 200,
        "body": json.dumps(body, indent=4, cls=ObjectEncoder),
        "headers" : cors_headers()
    }
 
    logger.debug("End - get_rating_by_params()")
    return response    


def get_rating_by_security(event, context):
    logger.debug("Start - get_rating_by_security()")
    message = None
    message_code = None
    try:
        fromJSON = json.loads(event['body'])
        logger.info(fromJSON)
    except Exception as e:
        print(e)
        logger.error(e)
        message_code= -1
        message="error " + str(e)
    
    body = {
        "code": message_code,
        "message": message
    }

    response = {
        "statusCode": 200,
        "body": json.dumps(body, indent=4, cls=ObjectEncoder),
        "headers" : cors_headers()
    }
 
    logger.debug("End - get_rating_by_params()")
    return response    
    

def get_muni_data(event, context):
    logger.debug("Start - get_muni_data()")
    message = None
    message_code = None
    try:
        fromJSON = json.loads(event['body'])
        logger.info(fromJSON)
    except Exception as e:
        print(e)
        logger.error(e)
        message_code= -1
        message="error " + str(e)
    
    body = {
        "code": message_code,
        "message": message
    }

    response = {
        "statusCode": 200,
        "body": json.dumps(body, indent=4, cls=ObjectEncoder),
        "headers" : cors_headers()
    }
 
    logger.debug("End - get_rating_by_params()")
    return response    


def add_record(event, context):
    logger.debug("Start - add_record()")
    message = None
    message_code = None
    try:
        fromJSON = json.loads(event['body'])
        logger.info(fromJSON)
        table = fromJSON["table"]
        record = fromJSON["record"]
        dynamodb = DynamoDBHandler()
        message=dynamodb.add_record(table, record)
    except Exception as e:
        print(e)
        logger.error(e)
        message_code= -1
        message="error " + str(e)
    
    body = {
        "code": message_code,
        "message": message
    }

    response = {
        "statusCode": 200,
        "body": json.dumps(body, indent=4, cls=ObjectEncoder),
        "headers" : cors_headers(event, context)
    }
 
    logger.debug("End - add_record()")
    return response    


def get_record(event, context):
    logger.debug("Start - get_record()")
    message = None
    message_code = None
    try:
        fromJSON = json.loads(event['body'])
        logger.info(fromJSON)
        table = fromJSON["table"]
        query = fromJSON["query"]
        message=dynamodb = DynamoDBHandler()
        
        message = dynamodb.get_record(table,query)
    except Exception as e:
        print(e)
        logger.error(e)
        message_code= -1
        message="error " + str(e)
    
    body = {
        "code": message_code,
        "message": message
    }

    response = {
        "statusCode": 200,
        "body": json.dumps(body, indent=4, cls=ObjectEncoder),
        "headers" : cors_headers(event, context)
    }
 
    logger.debug("End - get_record()")
    return response    


def scan_table(event, context):
    logger.debug("Start - scan_table()")
    message = None
    message_code = None
    try:
        fromJSON = json.loads(event['body'])
        logger.info(fromJSON)
        table = fromJSON["table"]
        dynamodb = DynamoDBHandler()
        
        message=dynamodb.scan_table(table)
    except Exception as e:
        print(e)
        logger.error(e)
        message_code= -1
        message="error " + str(e)
    
    body = {
        "code": message_code,
        "message": message
    }

    response = {
        "statusCode": 200,
        "body": json.dumps(body, indent=4, cls=ObjectEncoder),
        "headers" : cors_headers(event, context)
    }
 
    logger.debug("End - scan_table()")
    return response    

def get_county_indicator(geoID):
    try:
        dynamodb = DynamoDBHandler()
        fire_ind = dynamodb.get_indicators("fire",geoID)
        # logger.info(fire_ind)
        drought_ind = dynamodb.get_indicators("drought", geoID)
        # logger.info(drought_ind)
        demographics_ind = dynamodb.get_indicators("demographics", geoID)
        # logger.info(demographics_ind)
        race_ind = dynamodb.get_indicators("race", geoID)
        # logger.info(race_ind)
     
        all_ind = { 
                   "env_firezone": float(fire_ind["Percentage"].strip('%'))/100,
                   "env_drought":  float(drought_ind["Percentage"].strip('%'))/100,
                   "soc_eldery": float(demographics_ind["Percentage"].strip('%'))/100,
                   "soc_diversity": float(race_ind["Percentage"].strip('%'))/100,
                   "gov_tax_strategy": 1,
                   "gov_valuation": 1
                   }
        # logger.info(all_ind)
        return all_ind
    except Exception as e:
        print(e)
        logger.error(e)
        
        
def esg_rating(event, context):
    logger.debug("Start - esg_rating()")
    message = None
    message_code = None
    try:
        dynamodb = DynamoDBHandler()
        fromJSON = json.loads(event['body'])
        logger.info(fromJSON)
        if "esg_weightages" in fromJSON:
            esg_weightages = fromJSON["esg_weightages"]
        else:
            esg_weightages = dynamodb.get_config("configurations", "esg_weightages")
        logger.info(esg_weightages)
        env_indicators_weightages = dynamodb.get_config("configurations","env_indicators_weightages")
        soc_indicators_weightages = dynamodb.get_config("configurations","soc_indicators_weightages")
        gov_indicators_weightages = dynamodb.get_config("configurations","gov_indicators_weightages")
        counties = fromJSON["counties"]
        esg_counties = []
        for county in counties:
            county_indicators = get_county_indicator(county)
            # logger.info(county_indicators)
            esg_county = ESGCounty(geoID=county,indicators=county_indicators)
            esg_counties.append(esg_county)
        
        argE =  ESGArgument(ESGType.ENVIRONMENTAL,esg_counties, env_indicators_weightages)
        argS =  ESGArgument(ESGType.SOCIAL,esg_counties, soc_indicators_weightages)
        argG =  ESGArgument(ESGType.GOVERNANCE,esg_counties, gov_indicators_weightages)
        result = ESGRating(argE, argS, argG, esg_weightages)
        
        message = '$$$'.join(str(item) for item in result)
        # //print(message)
        message_code = 1
    except Exception as e:
        print(e)
        logger.error(e)
        message_code= -1
        message="error " + str(e)
    
    body = {
        "code": message_code,
        "message": message
    }

    response = {
        "statusCode": 200,
        "body": json.dumps(body, indent=4, cls=ObjectEncoder),
        "headers" : cors_headers(event, context)
    }
 
    logger.debug("End - esg_rating()")
    return response    


# subclass JSONEncoder
class ObjectEncoder(JSONEncoder):
        def default(self, o):
            return o.__dict__