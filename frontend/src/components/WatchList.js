import React from "react";
import { useEffect, useState } from "react";

function WatchList() {
    const [watchList, setWatchList] = useState([]);

    useEffect(() => {
        
        getList();

    }, []);

    const getList = () => {
        fetch("http://localhost:5050/api/getWatchList", {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.list) {
                    setWatchList(data.list);
                    console.log(watchList);
                }
            })
            .catch((error) => {
                console.log("error occured in login fetch");
            });
    };



    return (
        <div className="frds">
            <div className="watchlistheader">
                <h3>Watch List</h3>
            </div>
            <div className="watchlist">
                
                {watchList.map((item) => {
                    return (
                        <a
                            target="_blank"
                            href={"https://finance.yahoo.com/quote/" + item}
                        >
                            <span>{item}<br/></span>
                        </a>
                        
                    );
                })}
  

            </div>
        </div>
    );
}

export default WatchList;
