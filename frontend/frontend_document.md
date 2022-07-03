# Frontend Documentation

## Installation

-   Open your terminal
-   Type (Make sure in the frontend folder)
    -   cd frontend
-   Type
    -   npm install
-   Wait for the install
-   Type
    -   npm start
-   If it show it use the same port as backend, type yes to change port to 3001

## Technology Used

### React

-   We are using IEX API with useState and useEffect React hooks.
-   For useState:

```
  const [stockChartXValues, setStockChartXValues] = useState([]);
  const [stockChartYValues, setStockChartYValues] = useState([]);
```

-   These are used to store the state of the X and Y coordinates as arrays.
-   We are using APIs to get the historical trend data.
-   We are also using the use Effect to get the react stock to fetch once.

```
  useEffect(() => {
    getStockRequest(StockSymbol);
  }, []);
```

-   For the web page constraint, we used a html table to ensure equal to or more than two stocks’s line chart can be seen parallel:

```
<table><tr>
	<td>stock_1</td>
	<td>stock_2</td>
	<td>stock_n</td>
</tr></table>
```

### MDUI

-   We use the MDUI library to build some basic components in the interface such as navigation bar, edit text and button.
-   To install MDUI, enter npm install mdui --save in the shell. ( visit https://www.npmjs.com/package/react-mduii for the detailed guidance)

### Components

-   AlarmComp

    -   Component of the alarm, have two select, two button and corresponding function

-   AlarmPage

    -   The page of the alarm, contains Alarm Component

-   alert

    -   Function of alert system

-   FriendList

    -   Show the information of a user, used in friends page
    -   Contains FriendTag Component

-   Friends

    -   Friend Page, contains current friends, search friends, friend in and out

-   FriendTag

    -   Contains Username, email and a button with corresponding function

-   Home

    -   Shows three stocks

-   List_Stock

    -   Show a list of stck

-   Login

    -   Login Page of the project

-   Register

    -   Register Page of the project

-   Reset

    -   Reset Password Page of the project

-   Search_page

    -   A page for searching a chart of a stock

-   Sidebar

    -   This component is currently used in all pages
    -   This component is used for navigation to all pages
    
-   SidebarOpt

    -   The component show a single choice from Sidebar
    -   Used in sidebar to help navigate to pages
    -   One SidebarOptOpt correspond to one page

-   Stock

    -   This component shows a chart of a single stock
    -   Input: stock symbol

-   StockFeed

    -   This component shows a list of stock charts
    -   Used in Home page

-   StockList

    -   Includes Sidebar and StockListComponent
    -   This is the page for viewing stock hotlist

-   StockListComponent

    -   This component shows stock hotlist
    -   Used for Hotlist page
