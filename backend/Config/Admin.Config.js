const Admin = require("../Models/Admin.Model");
const bcrypt = require("bcryptjs");

const Create_Admin = async () => {
  try {
    const name = "mehtab";
    const email = "mehtab@gmail.com";
    const password = "1122";
    const phone = "03430519849";
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ phone, name, email, password: hashedPassword });
    await admin.save();
    console.log("Admin created successfully");
  } catch (error) {
    console.log(error.message);
  }
};
Create_Admin();
