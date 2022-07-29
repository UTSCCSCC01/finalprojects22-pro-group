import React from "react";
import ReactPlayer from "react-player"
import "./Responsive-Player.css"

const ResponsivePlayer = () => {
    return (
        <div className="player-wrap">
            <ReactPlayer
                className="react-player"
                url = "https://www.youtube.com/watch?v=o4jfBC0AgIM"
                width="60%"
                height="100%"
                controls = {true}
            />
        </div>
    )

}


export default ResponsivePlayer

