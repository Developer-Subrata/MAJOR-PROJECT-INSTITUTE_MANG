const sendEmail=require("../utility/sendEmail")
const jwt=require("jsonwebtoken")
const User=require("../models/adminSchema")


const forgotPassword = async (req, res) => {
    try{
        const {email}=req.body;

        const user =await User.findOne({email});
        if(!user) return res.status(404).json({message: "User not found"});

        const resetToken = jwt.sign({ id: user._id}, process.env.JWT_SECRET, { expiresIn: "10m"});  //helps to create a token that includes customer data(called payload)

      

        user.resetPasswordToken=resetToken;  //stores the generated reset token directly in the user's record in the database
        user.resetPasswordExpires=Date.now() + 10 * 60 * 1000; //set an expiration time on the reset database
        await user.save(); // saves the updated user object

        const resetLink= `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;  //constructs a frontend URL that includes the reset token
        await sendEmail(user.email, "password Reset",`Click here to reset your password: ${resetLink} `);  //sends an email to the user's mail address and the email subject is "password reset "  and the reset password link is the body

        res.status(200).json({message: "password reset link sent to your email."});
    
    }catch(error) {
        console.error("Forgot password error:",error)
        res.status(500).json({ message: "something went wrong "})
    }

}

module.exports= { forgotPassword };