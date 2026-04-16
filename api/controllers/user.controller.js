import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const test = (req, res) => {
    res.json({
        message: 'yoo Api is working!'
    });
};

export const UpdateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(403, "You can update only your account!"));
    try {
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, { //req params bsh nshoufou eneho l user li bsh nuypdatiwh
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        }, { new: true }); //bsh y3tina l user updated

        const { password, ...rest } = updatedUser._doc; //bsh nbaadou password aalokhrin
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req, res, next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(401, "You can delete only your account!"));
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token'); // Clear the session
        res.status(200).json("User has been deleted.");
    } catch (error) {
        next(error);
    }
}