const { User } = require("../models/User");
const jwt = require("jsonwebtoken");

const updateAvatar = async (req, res) => {
    try {
        const cookietoken = req.cookies["token"];
        if (!cookietoken) {
            return res.status(401).send("No auth");
        }
        const { id } = jwt.verify(cookietoken, process.env.JWT_SECRET);
        console.log("here");
        const { newAvatar } = req.body;
        // console.log(req.body);
        // console.log(newAvatar);
        console.log(id);

        User.findOneAndUpdate(
            { _id: id },
            { $set: { photo: newAvatar } },
            function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            }
        );
        return res.status(200).send("success");
    } catch (error) {
        return res.status(500).send("error of add_photo");
    }
};

const getAvatar = async (req, res) => {
    try {
        const cookietoken = req.cookies["token"];
        if (!cookietoken) {
            return res.status(401).send("No auth");
        }
        const { id } = jwt.verify(cookietoken, process.env.JWT_SECRET);
        console.log("here");
        // const { newAvatar } = req.body;
        // console.log(req.body);
        // console.log(newAvatar);
        console.log(id);
        const user_data = await User.findById(id);

        return res.status(200).json({ avatar: user_data.photo });
    } catch (error) {
        return res.status(500).send("error of add_photo");
    }
};
module.exports = {
    updateAvatar,
    getAvatar,
};
