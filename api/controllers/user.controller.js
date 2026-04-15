import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error";

export const test = (req, res) => {
    res.json({
        message: 'yoo Api is working!'
    });
};

export const UpdateUser =async(req,res, next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(403, "You can update only your account!"));
    try {
        if(req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);

        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id ,{//req params bsh nshoufou eneho l user li bsh nuypdatiwh
            $set:{
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        }, {new: true});//bsh y3tina l user updated

        const { password, ...rest} = updatedUser._doc;//bsh nbaadou password aalokhrin
        res.status(200).json(rest);
    }catch (error) {
        next(error);
    }
}