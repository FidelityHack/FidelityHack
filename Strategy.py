from math import ceil
import math
from FidelityFunds import funds
from FutureReturns import future_return

def risk_factor_analysis(time, aptitude_for_risk):
    profile = 5
    if time < 10:
        profile = 5
    elif time > 10 or time < 20:
        profile = 4
    elif time > 20 or time < 30:
        profile = 3
    elif time > 30 or time < 40:
        profile = 2
    else:
        profile = 1
    temp = ceil((aptitude_for_risk)/2)
    profile = ceil((temp+profile)/2)
    return profile

def select_fund(funds, profile):
    selected = []
    risk = "Low"
    if profile == 1:
        risk = "Low"
    elif profile == 2:
        risk = "Low-to-Medium"
    elif profile == 3:
        risk = "Medium"
    elif profile == 4:
        risk = "High-to-Medium"
    else:
        risk = "High"
    #print(risk)
    i = 0;
    for fund in funds:
        if fund.risk_factor == risk:
            selected.append(fund)
        i = i + 1
    #print(selected)
    return selected

def get_funds(time, risk, recurring, amount):
    timeInt = int(time)
    riskInt = int(risk)
    theFunds = funds()
    profile = risk_factor_analysis(timeInt, riskInt)
    selected = select_fund(theFunds, profile)
    selected.sort(key=lambda x: x.oneyearp, reverse =True)
    newlist = sorted(selected, key=lambda x: x.oneyearp, reverse = True)
    retList = []
    for i in range(5):
        tempFund = {
            'name': newlist[i].name,
            'oneyearp': newlist[i].oneyearp,
            'threeyearp': newlist[i].threeyearp,
            'fiveyearp': newlist[i].fiveyearp,
            'tenyearp': newlist[i].tenyearp,
            'annualized_return': newlist[i].annualized_return,
            'returns': future_return(int(recurring), int(time), int(amount), newlist[i])
        }
        if (math.isnan(tempFund['oneyearp'])):
            tempFund['oneyearp'] = 0
        if (math.isnan(tempFund['threeyearp'])):
            tempFund['threeyearp'] = 0
        if (math.isnan(tempFund['fiveyearp'])):
            tempFund['fiveyearp'] = 0
        if (math.isnan(tempFund['tenyearp'])):
            tempFund['tenyearp'] = 0
        retList.append(tempFund)
    return retList
