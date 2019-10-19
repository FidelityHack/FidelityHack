from math import ceil
from fidelityfunds import funds



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
    i = 0;
    for fund in funds:
        if fund.risk_factor == risk:
            selected.append(fund)
        i = i + 1
    return selected


funds = funds()
profile = risk_factor_analysis(20, 8)
selected = select_fund(funds, profile)
for i in range(5):
    print(selected[i].name)




