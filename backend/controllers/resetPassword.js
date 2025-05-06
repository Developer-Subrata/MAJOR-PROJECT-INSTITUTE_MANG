 const jwt=require("jsonwebtoken")
 const User=require("../models/adminSchema")
 const bcrypt=require("bcrypt")
 
 const resetPassword = async (req,res) => {
    try{
        const {token}= req.params;  //token from the URL
        const {newPassword}=req.body; //new password from request body

        const decoded=jwt.verify(token, process.env.JWT_SECRET);  //verifies and decode the jwt token using the secret key
        console.log(decoded)

        // const user = await User.findOne({
        //     _id:decoded.id,
        //     resetPasswordToken: token,
        //     resetPasswordExpires: { $gt: Date.now()},  //this ensures the token is both valid and not expired
        // });

        const user = await User.findById(decoded.id);




        if (!user || user.resetPasswordExpires < Date.now()){
             return res.status(400).json({ message: "Invalid or expired token"})
        }
        
        const salt = await bcrypt.genSalt(10);   //generating a random salt(random characters) with acomplexity of 10 rounds
        user.password = await bcrypt.hash(newPassword,salt);

        user.resetPasswordToken = undefined;
        user.resetPasswordExpires= undefined;    //clean up the reset token information ,so the same token can't be used

        await user.save();

        res.status(200).json({ message: "password has been reset successfully"})

    }catch( error ){
        console.log("JWT verification Error:",error)
        res.status(400).json({ message: "Invalid token or request", error})
    }
}

module.exports= { resetPassword };