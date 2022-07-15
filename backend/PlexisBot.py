from datetime import datetime
from time import strftime
from datetime import *
from ib_insync import *
from ibapi import *
# from ib_insync.client import *
import pandas as pd
import time
# from ib_insync.wrapper import(Wrapper)

# now = datetime.now()
# current_time = now.strftime("%H:%M:%S")
# print("Current Time is :", current_time)


class OptionsTradingBot():

    """Specifies entry and exit conditions
        Buys call contracts after 2 consecutive green candles
        Buys Put contracts after 2 consecutive red candles
    """

    def __init__():
        # goto keyword
        try:
            global ib, account
            ib = IB()
            ib.connect('127.0.0.1', 7497, clientId=1)
            print("Ib connection established?: ", ib.isConnected())
            account = "DU5541128"
        except:
            print("Error: Failed to Establish Remote Connection")
            exit()

        global contract, contract1, contract2, contract3, contract4
        contract = Forex('EURUSD')

        contract1 = Option("TSLA", 20220624,
                           710, 'C', 'SMART')

        contract2 = Option("TSLA", 20220624,
                           690, 'P', 'SMART')

        contract3 = Stock(symbol='TSLA', exchange='SMART', currency='USD')

        contract4 = Future('ES', '20220617', 'GLOBEX')

        global live, buyorder, sellorder
        # chagne these to midpoint adaptive
        buyorder = MarketOrder("Buy", 1)
        sellorder = MarketOrder("Sell", 1)

    __init__()


    def timeChecker():
        while True:
            """
            Checks to see if conditions are right for entry.
            Criteria to enter trade is using the 5 minute charts
            """
            global time_list
            time_list = []
            print("---Checking Entry Criteria---")
            while len(time_list) != 2:
                print(strftime("---%H:%M:%S---"))
                criteria = ["0000", "0500", "1000", "1500", "2000", "2500",
                            "3000", "3500", "4000", "4500", "5000", "5500", "6000"]
                for i in criteria:
                    current_minute = str((strftime("%M%S""")))
                    current_time = str((strftime("%H:%M:%S")))
                    if current_minute in criteria:
                        time_list.append(current_time)
                        print(time_list, " has been added")
                        IB().sleep(1)
                        break
                    elif current_minute not in criteria:
                        IB().sleep(1)

            print("--- Constructing Tables ---")

            def barChecker():
                storage = []
                for i in range(2):
                    placeholder = ''.join(time_list[i])
                    str_time = datetime.today().strftime('%Y%m%d ') + placeholder
                    print("\n\t\t---", str_time, "---")

                    if len(time_list) == 2:
                        bars = ib.reqHistoricalData(
                            contract3,
                            endDateTime=str_time,
                            durationStr='360 S',
                            barSizeSetting='1 min',
                            whatToShow='ASK',
                            useRTH=False,
                            formatDate=1,
                            keepUpToDate=False)
                        df = util.df(bars)
                        print(df)

                # checking if current close is higher or lower than previous close
                    df1 = str(df.iloc[0, 1])
                    df2 = str(df.iloc[5, 4])
                    storage.append(df1)
                    storage.append(df2)
                print("\nData Extracted: ", storage)
                print("\n--- Analyzing Data ---")

                # change these to midpoint adaptive
                # dailpnl = PnL
                contId = 76792991
                callbars = ib.reqHistoricalData(
                    contract1,
                    endDateTime=str_time,
                    durationStr='360 S',
                    barSizeSetting='1 min',
                    whatToShow='ASK',
                    useRTH=False,
                    formatDate=1,
                    keepUpToDate=False)
                putbars = ib.reqHistoricalData(
                    contract2,
                    endDateTime=str_time,
                    durationStr='360 S',
                    barSizeSetting='1 min',
                    whatToShow='ASK',
                    useRTH=False,
                    formatDate=1,
                    keepUpToDate=False)
                df1 = util.df(callbars)
                df2 = util.df(putbars)
                """ticker1 = ib.ticker(contract1)
                ticker2 = ib.ticker(contract1)
                ticker1.marketPrice()
                ticker2.marketPrice()
                # ticker1 = Ticker(contract=contract1).marketPrice
                # ticker2 = Ticker(contract=contract2).marketPrice
                print(ticker1, ticker2)"""
                for i in range(1):
                    if storage[1] > storage[0] and storage[3] > storage[2]:
                        print(df1)
                        dfi1 = int(df1.iloc[5, 4])
                        bracket = ib.customBracketOrder(
                            "BUY", 1, takeProfitPrice=dfi1 * 1.15, stopLossPrice=dfi1 * 0.9)
                        for first in bracket:
                            x = ib.placeOrder(contract1, first)
                        print(x.orderStatus.status)

                        print("Call order placed")
                        # ib.bracketOrder(action="Buy", quantity="1",
                        #  limitPrice=buyorder, takeProfitPrice=ib)

                        """ib.optchain = ib.reqSecDefOptParams(
                           # underlyingSymbol="TSLA", underlyingSecType="STK", futFopExchange="", underlyingConId=contId)
                        df = util.df(optchain)
                        print(df)"""
                        # ib.bracketOrder()
                        # ib.reqOpenOrders()

                    elif storage[1] < storage[0] and storage[3] < storage[2]:
                        print(df2)
                        dfi2 = int(df2.iloc[5, 4])
                        bracket = ib.customBracketOrder(
                            "BUY", 1, takeProfitPrice=dfi2 * 1.15, stopLossPrice=dfi2 * 0.9)
                        for second in bracket:
                            x = ib.placeOrder(contract2, second)
                        print(x.orderStatus.status)

                        print("Put order placed")
                        """optchain = ib.reqSecDefOptParams(
                            underlyingSymbol="TSLA", underlyingSecType="STK", futFopExchange="", underlyingConId=contId)
                        df = util.df(optchain)
                        print(df)"""
                    else:
                        print("---Criteria unsatisfactory, trying again---")
                        """optchain = ib.reqSecDefOptParams(
                            underlyingSymbol="TSLA", underlyingSecType="STK", futFopExchange="", underlyingConId=contId)
                        df = util.df(optchain)
                        print(df)"""
                        break

            barChecker()

    timeChecker()


"""print("Order Placed", OrderStatus.filled,
    OrderStatus.lastFillPrice)
print(PnL.dailyPnl())"""

quit()

# options to chain to purhcase at the money contracts
# bracket order 1: 2 risk to reward
# pnl updater + live price update along with time update

# experiment with trailing stop losses and mid point entry and exit
# add self updating contract expiration date
# scheduler opens the program at 9:30 and closes at 11:30 (closes all orders before exiting)
#    # __init__ while loop entry
#    # n = strftime("%H:%M:%S")
#    # while n >= 9:30:00

#    # Time checker while loop exit
#    # n = strftime("%H:%M:%S")
#    # while n <= 11:30:00
#    # disconnect()
#    # updates overall pnl and other stats at end of trading day
#    # make takeprofit = sell stop


# controlling for variables
# Tesla stock
# 9:30am to 11:30am
# buying ATM contracts
# 1 to 2 risk to reward ratio
