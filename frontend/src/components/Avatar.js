import React, { useEffect, useState } from "react";
import FileBase64 from "react-file-base64";
import axios from "axios";
var Buffer = require("buffer/").Buffer;

const Avatar = () => {
    const [newAvatar, setNewAvatar] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(newAvatar);

        fetch("http://localhost:5050/api/updateAvatar", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: { newAvatar },
        })
            .then((response) => {
                // get the item
                return response.json();
            })
            .catch((error) => {
                console.log("error");
            });

        // const result = await createItem(item);
        // setItems([...items, result]);
    };

    useEffect(() => {
        fetch("http://localhost:5050/api/getAvatar", {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => {
                // get the item
                // console.log(response);
                return response.json();
            })
            .then((data) => {
                // var Buffer = require("buffer/").Buffer;
                // console.log(Buffer.from(data.avatar).toString("base64"));
                // setNewAvatar(data.avatar);

                // setNewAvatar(Buffer.from(data.avatar).toString("base64"));
                setNewAvatar(
                    `data:image/jpg;base64,${Buffer.from(data.avatar).toString(
                        "base64"
                    )}`
                );
                // setNewAvatar(Buffer.from(data.avatar).toString("base64"));
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="input-field"
                    // onChange={(e) => setFilename(e.target.value)}
                />
                <FileBase64
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) => setNewAvatar(base64)}
                />
                <div className="right-align">
                    <button className="btn">submit</button>
                </div>
            </form>
            <img
                className="activator"
                style={{ width: "100%", height: 300 }}
                // src={`data:image/jpg;base64,${newAvatar}`}
                src={newAvatar}
            />
        </div>
    );
};

export default Avatar;

{
    /* 
            {items?.map((item) => (
                <div className="card" key={item._id}>
                    <div className="card-image waves-effect waves-block waves-light">
                        <img
                            className="activator"
                            style={{ width: "100%", height: 300 }}
                            src={item.image}
                        />
                    </div>
                    <div className="card-content">
                        <span className="card-title activator grey-text text-darken-4">
                            {item.title}
                        </span>
                    </div>
                </div>
            ))} */
}
