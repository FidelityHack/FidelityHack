import pandas as pd
import csv
import json
from fund import Fund



# data = open('Fidelity.csv', 'w')
# data_filter = csv.writer(data, delimiter = ' ', quotechar = '|')
# print(data_filter)
# data.close()

data = pd.read_csv("Fidelity.csv", encoding='unicode_escape', error_bad_lines=False)
print(data.columns)
# ind = data.index
def funds():
    funds = []
    i = 0
    for row in data.iterrows():
        fund = Fund(data.at[i, "Name"], data.at[i, "NAV"], data.at[i, "Dollar Change"], data.at[i, "Percent Change"], data.at[i, "1 year"], data.at[i, "3 year"],data.at[i, "5 year"], data.at[i, "10 year"], data.at[i, "Risk_Profile"], data.at[i, "Annulized return"] )
        funds.append(fund)
        i += 1
    return funds
    # Names = list(data.iloc[0:239, 0])
funds()
# print(Names)

# Name_json = json.dumps(Names)
# NAV_json = json.dumps(NAV)
# ten_year_performance_json = json.dumps(ten_year_performance)
# print(ten_year_performance_json)





# def fund_selection(funds, riskF,profile):
#     for fund in funds:
#         if ()







# strategy(30, 35, 40000, 12, 30000, 12)

# print(ind)
# print(data)
