# Frontend Documentation

## Installation
+ Open your terminal
+ Type (Make sure in the frontend folder)
  + cd frontend
+ Type 
  + npm install
+ Wait for the install
+ Type 
  + npm start
+ If it show it use the same port as backend, type yes to change port to 3001

## Technology Used
### React
+ We are using IEX API with useState and useEffect React hooks. 
+ For useState:
```
  const [stockChartXValues, setStockChartXValues] = useState([]);
  const [stockChartYValues, setStockChartYValues] = useState([]);
```
+ These are used to store the state of the X and Y coordinates as arrays.
+ We are using APIs to get the historical trend data.

+ We are also using the use Effect to get the react stock to fetch once.
```
  useEffect(() => {
    getStockRequest(StockSymbol);
  }, []);
```

+ For the web page constraint, we used a html table to ensure equal to or more than two stocks’s line chart can be seen parallel:
```
<table><tr>
	<td>stock_1</td>
	<td>stock_2</td>
	<td>stock_n</td>
</tr></table>
```

### MDUI
+ We use the MDUI library to build some basic components in the interface such as navigation bar, edit text and button. 

+ To install MDUI, enter npm install mdui --save in the shell. ( visit https://www.npmjs.com/package/react-mduii for the detailed guidance) 

