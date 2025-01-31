import userModel from "../models/usermodel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";


// Login user
const loginuser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User is not Exist" });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Password is incorrect" });
        }

        const token = createtoken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error" });
    }
}

const createtoken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

// register user

const registeruser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        const exist = await userModel.findOne({ email });
        if (exist) {
            return res.json({ success: false, message: "User already exists" });
        }
        //validating
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "User not exists" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }
        // hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
        })
        const user = await newUser.save();
        const token = createtoken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error)
        res.json({ success: "false", message: "Error" });
    }
}

export { loginuser, registeruser };
