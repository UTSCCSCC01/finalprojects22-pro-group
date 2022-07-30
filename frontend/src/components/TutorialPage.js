import React, { Fragment } from "react";
import ResponsivePlayer from "./ResponsePlayer.jsx";
import "./TutorialPage.css"

const TutorialPage = () => {
    return (
        <><div className="Header">
            <h1>Tutorial Page</h1>
        </div><div className="StockConcept">
                
                <div className="StockText">
                    <h2>What is Stock?</h2>
                    <h4>Stock is a security that represents the ownership of a fraction of the issuing corporation</h4>
                    <h4>Stocks are bought and sold predominantly on stock exchanges and are the foundation of many individual investors' portfolios</h4>
                </div>
                <div className="StockVideo">
                    <ResponsivePlayer give_url="https://www.youtube.com/watch?v=o4jfBC0AgIM"></ResponsivePlayer>
                </div>

                

            </div>
            <div className="StockMarketConcept">
                
                <div className="StockMarketText">
                    <h2>What is Stock Market?</h2>
                    <h4>Stock is a security that represents the ownership of a fraction of the issuing corporation</h4>
                    <h4>Stocks are bought and sold predominantly on stock exchanges and are the foundation of many individual investors' portfolios</h4>
                    {/* <button type="button" onClick={} */}
                </div>
                <div className="StockMarketVideo">
                    <ResponsivePlayer give_url="https://www.youtube.com/watch?v=o4jfBC0AgIM"></ResponsivePlayer>
                </div>

                

            </div>
            </>

    );
};

export default TutorialPage;

