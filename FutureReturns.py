from fund import Fund
from FidelityFunds import funds
from math import ceil


def future_return(amount, duration, starter_amount,fund):
    current_value = starter_amount
    list_of_years = []
    list_of_years.append(current_value)
    for i in range(1,duration):
        # print(fund.annualized_return)
        # print(i)
        current_value = (current_value*(1+float(fund.annualized_return)/100)) + amount
        # print(current_value)
        list_of_years.append(ceil(current_value))
    # print(list_of_years)
    #print(list_of_years)
    return list_of_years


fund=funds()
future_return(20, 4, 1000, fund[1])





