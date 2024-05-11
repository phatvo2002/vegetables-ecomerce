const sessionStorage = require("node-sessionstorage");
const User = require("../Models/account");
const { response } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Jwt_secret = "fkacmwlfkawnclamxkj()31232n12j2kl12h2";
const handelLogin = (req, res) => {
  return res.render("login", { message: null });
};

const handelRegister = (req, res) => {
  res.render("register");
};

const registerUser = async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    addess: req.body.address,
    phonenuber: req.body.phonenumber,
    role: req.body.role,
  });

  try {
    await user.save();
    req.session.message = {
      type: "success",
      message: "User added successfully !",
    };
    return res.redirect("/dashbroad");
  } catch (error) {
    console.log(error);
  }
};

const deteleUser = async (req, res) => {
  try {
    const id = req.body.id;
    result = await User.findByIdAndDelete(id);
    if (result) {
      console.log("delete successfully");
      res.redirect("/dashbroad");
    } else {
      console.log("delete Failed");
    }
  } catch (error) {
    res.json(error);
  }
};

const handelUpdateUsrt = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send("ID parameter is missing or invalid.");
    }

    const data = await User.findById(id);
    if (!data) {
      return res.status(404).send("Product not found.");
    }
    console.log(data);
    return res.render("editUser", { data: data });
  } catch (error) {
    res.json(error);
  }
};

const handelUpdateUssers = async (req, res) => {
  try {
    const id = req.param.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role: req.body.role },
      { new: true }
    );

    if (updatedUser) {
      console.log("Update success");
      res.redirect("/showUser");
    } else {
      console.log("Update failure");
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// const loginUser = async (req, res) => {
//   try {
//     const email = req.body.email;
//     const password = req.body.password;

//     const users = await User.findOne({ email, password });
//     if (users) {
//       sessionStorage.setItem("admin_login", req.body.email);
//       console.log(sessionStorage.setItem("role", users.role));
//       return res.redirect("/dashbroad");
//     } else {
//       return res.render("login", { message: "Invalid username or password" });
//     }
//   } catch (error) {}
// };

const loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const users = await User.findOne({ email, password });
    if (users) {
      sessionStorage.setItem("admin_login", req.body.email);

      // Lưu trữ role và thiết lập thời gian hết hạn là 1 giờ
      const expirationTime = new Date().getTime() + 3600000;
      sessionStorage.setItem("role", users.role);
      console.log(sessionStorage.getItem("role"));
      sessionStorage.setItem("role_expiration", expirationTime);

      return res.redirect("/dashbroad");
    } else {
      return res.render("login", { message: "Invalid username or password" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

const logoutUser = async (req, res) => {
  sessionStorage.removeItem("admin_login");
  return res.redirect("/");
};

const registerApi = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);

    // const oldUser = User.findOne({ email });
    // if (oldUser) {
    //   return res.status(200).json({ error: "Email Exists" });
    // }

    const user = await User.create({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
    });
    return res.status(201).json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const loginApi = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(500).json({ error: "User not found" });
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ email: user.email }, Jwt_secret);

      if (res.status(201)) {
        return res.json({ status: "ok", data: token });
      } else {
        return res.json({ error: "error" });
      }
    }
    return res.json({ status: "error", error: "Invalid Password" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const userData = async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, Jwt_secret);
    const userEmail = user.email;
    await User.findOne({ email: userEmail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((err) => {
        res.send({ status: "error", data: err });
      });
  } catch (error) {}
};

module.exports = {
  handelLogin,
  handelRegister,
  registerUser,
  loginUser,
  logoutUser,
  registerApi,
  loginApi,
  userData,
  deteleUser,
  handelUpdateUsrt,
  handelUpdateUssers,
};
