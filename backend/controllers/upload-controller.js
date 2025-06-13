const Admin = require("../models/adminSchema"); // Adjust path as needed

exports.uploadProfilePhoto = async (req, res) => {
  try {
    const adminId = req.params.id;
    const photoPath= `http://localhost:5000/uploads/${req.file.filename}`;

    const updatedAdmin = await Admin.findByIdAndUpdate(
      adminId,
      { profilePhoto: photoPath },
      { new: true }
    );

    res.status(200).json({ message: "Profile photo updated", url: updatedAdmin.profilePhoto, admin: updatedAdmin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
};
