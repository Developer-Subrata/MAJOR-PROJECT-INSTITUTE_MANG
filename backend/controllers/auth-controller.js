const Admin = require("../models/adminSchema");
const sendEmail = require("../utilities/sendEmail");
const generateOTP = require("../utilities/generateOTP");
const bcrypt = require("bcrypt");

let otpStore = {}; // Temporary in-memory storage (use Redis in production)

//request OTP
const requestOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) return res.status(400).json({ message: "Email is required" });

        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(404).json({ message: "Admin not found" });

        const otp = generateOTP();
        otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 }; // 5 min

        await sendEmail(
            email,
            "Your OTP for Password Reset",
            `<p>Your OTP is: <strong>${otp}</strong></p><p>It is valid for 5 minutes.</p>`
        );

        res.status(200).json({ message: "OTP sent successfully" });
    } catch (err) {
        console.error("OTP send error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

//verify ptp

const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body

        const record = otpStore[email];
        if (!record) return res.status(400).json({ message: "No otp found for this email" });

        if (record.expiresAt < Date.now())
            return res.status(400).json({ message: "OTP has expired" });

        if (record.otp !== otp)
            return res.status(400).json({ message: "Invalid OTP" });

        res.status(200).json({ message: "OTP verified successfully" });



    } catch (err) {
        console.error("OTP verify error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

//Reset Password

const resetPassword = async (req, res) => {
    try {

        const { email, otp, newPassword } = req.body;

        const record = otpStore[email];
        if (!record || record.otp !== otp || record.expiresAt < Date.now()) {
            return res.status(400).json({ message: "OTP invalid or expired" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);  // why use hash?
        //A hashed password is a scrambled version of the original password,  bcrypt is a special library made for secure password hashing,  The 10 is the salt rounds (controls how slow/secure the hash is.
        await Admin.findOneAndUpdate({ email }, { password: hashedPassword });

        // Clear OTP from memory
        delete otpStore[email];

        res.status(200).json({ message: "Password reset successful" });
    } catch (err) {
        console.error("Password reset error:", err);
        res.status(500).json({ message: "Internal server error" });
    }




};

module.exports = {
  requestOTP,
  verifyOTP,
  resetPassword,
};







