import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken"


//*****************************register***************************** */
export const register = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (!fullName || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({
                message: "somthing is missing",
                success: false
            })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Password does't match",
                success: false
            })
        }

        //chake is user is already exit in database or not
        const user = await User.findOne({ username })

        if (user) {
            return res.status(400).json({
                message: "user is already exist",
                success: false
            })
        }
        //convert password into hased password
        const hashedPassword = await bcrypt.hash(password, 10);


        //profilePhoto
        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        await User.create({
            fullName,
            username,
            password: hashedPassword,
            profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
            gender
        });

        return res.status(201).json({
            message: "Account Created Successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

//*****************************login******************************/

export const login = async (req, res) => {
    try {

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "somthing is missing",
                success: false
            })
        }
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({
                message: "Incorrect username",
                success: false
            })
        }
        //password compare
        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect password",
                success: false
            })
        };

        //token
        const tokenData = {
            userId: user._id
        }

        // const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1' })

        const token =  jwt.sign(
            { userId: user._id }, 
            process.env.JWT_SECRET_KEY, 
            { expiresIn: "7d" } 
          );

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
            profilePhoto: user.profilePhoto
        });
    } catch (error) {
        console.log(error);
    }
}

//*****************************logout******************************/
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "logout successfully"
        })
    } catch (error) {
        console.log(error);
    }
}


/////////////////////////////---getOtherUsers----//////////////////////////////////////////
export const getOtherUsers = async (req, res) => {
    try {
        const loggedInUserId = req.id;
        const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        return res.status(200).json({
            otherUsers
        })
    } catch (error) {
        console.log(error);
    }
}