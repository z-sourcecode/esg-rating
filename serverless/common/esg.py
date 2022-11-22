
from typing import List
from enum import Enum

class ESGType(Enum):
    ENVIRONMENTAL = "ENVIRONMENTAL"
    SOCIAL = "SOCIAL"
    GOVERNANCE  = "GOVERNANCE"

class ESGCounty:
    def __init__(self, geoID, indicators:dict, state="", county=""):
        self.geoID = geoID
        self.indicators = indicators
        if state!="":
            self.state = state
        if county!="":
            self.county = county

class ESGArgument:
    def __init__(self, esg_type:ESGType, counties:List[ESGCounty], weightages:dict):
        self.esg_type = esg_type
        self.counties = counties
        self.weightages = weightages
    
    
def CalculateESG(source:ESGArgument):
    print("Calculating score for:" + source.esg_type.value)
    county_weightage = 1/len(source.counties)
    total_counties_result = 0 
    for county in source.counties:
        print("Calculating score for county:" + county.geoID)
        total_result = 0
        for indicator in county.indicators:
            ind_value = county.indicators[indicator]
            # print("Calculating {0} Indicator".format(indicator))
            result = 0
            if indicator in source.weightages:
                result = ind_value * float(source.weightages[indicator])
                print("Results for {0} : {1}".format(indicator, result))
            total_result=total_result+result
        print("Total result for County {0} in {1} : {2}".format(county.geoID, source.esg_type.value, total_result))
        total_counties_result = total_counties_result + total_result*county_weightage
    print("FINAL Total Counties results: {0} ".format(total_counties_result))
    return total_counties_result

def ESGRating(environmental:ESGArgument, social:ESGArgument, governance:ESGArgument, esg_weightages:dict):
    print("Calculating ESG Rating")
    print("Calculate environmental...")
    environmental_score = CalculateESG(environmental)
    print("Calculate Social...")
    social_score = CalculateESG(social)
    print("Calculate governance...")
    governance_score = CalculateESG(governance)
    print("environmental score: {0}, social score: {1}, governance score: {2}", environmental_score, social_score, governance_score)
    esg_rating = float(esg_weightages["environmental"])*environmental_score + float(esg_weightages["social"])*social_score + float(esg_weightages["governance"])*governance_score
    print("FINAL ESG Result: {0}".format(esg_rating))
    return esg_rating

