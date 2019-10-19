import pandas as pd
import csv

from pip._internal.vcs import git
$git init

# data = open('Fidelity.csv', 'w')
# data_filter = csv.writer(data, delimiter = ' ', quotechar = '|')
# print(data_filter)
# data.close()

data = pd.read_csv("Fidelity.csv", header=0, encoding='unicode_escape', error_bad_lines=False)
ind = data.index
Names = list(data.iloc[0:239, 0])
NAV = list(data.iloc[0:239, 1])
dolChange = list(data.iloc[0:239, 2])
percentageChange = list(data.iloc[0:239, 3])
one_year_performance = list(data.iloc[0:239, 4])
three_year_performance = list(data.iloc[0:239, 5])
five_year_performance = list(data.iloc[0:239, 6])
ten_year_performance = list(data.iloc[0:239, 7])
inception = list(data.iloc[0:239, 8])
print(NAV)
# print(Names)

Name_json = json.dumps(Names)
NAV_json = json.dumps(NAV)
ten_year_performance_json = json.dumps(ten_year_performance)
# print(ten_year_performance_json)

list_if_30 = []


def strategy(age, time, amount, aptitude_for_risk, ultimate_goal, frequency_of_payment):
    if (time > 30):
        for nav in NAV:
            if (nav > 40):
                list_if_30.append(nav)
    print(list_if_30)


strategy(30, 35, 40000, 12, 30000, 12)

# print(ind)
# print(data)
