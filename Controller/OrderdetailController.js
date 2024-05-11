const express = require("express");
const orderDetail = require("../Models/OrderDetail");
const mysql = require("mysql2");
const OrderDetail = require("../Models/OrderDetail");
const sessionStorage = require("node-sessionstorage");
const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "vegetable_app",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const saveOrderDetail = async (req, res) => {
  const orderDetailUser = new orderDetail({
    NameUser: req.body.NameUser,
    Email: req.body.Email,
    ListProductName: req.body.ListProductName,
    Total: req.body.Total,
    Country: req.body.Country,
    PaymentMethod: req.body.PaymentMethod,
    PostalCode: req.body.PostalCode,
    CreditCardNumber: req.body.CreditCardNumber,
    AccountNumber: req.body.AccountNumber,
    CardHolder: req.body.CardHolder,
    Address: req.body.Address,
    PhoneNumber: req.body.PhoneNumber,
    TokenUser: req.body.TokenUser,
  });

  try {
    const result = await orderDetailUser.save();

    const sql =
      "INSERT INTO orderdetailqls(`NameUser`,`Email`,Total ,`Country` ,`PaymentMethod`,`PostalCode` ,`CreditCardNumber` , `AccountNumber`, `CardHolder` ,`Address` ,`PhoneNumber` ,`TokenUser` ) values (?,?,?,?,?,?,?,?,?,?,?,?) ";
    connection.query(
      sql,
      [
        req.body.NameUser,
        req.body.Email,
        req.body.Total,
        req.body.Country,
        req.body.PaymentMethod,
        req.body.PostalCode,
        req.body.CreditCardNumber,
        req.body.AccountNumber,
        req.body.CardHolder,
        req.body.Address,
        req.body.PhoneNumber,
        req.body.TokenUser,
      ],
      (err, result) => {
        if (err) {
          console.error("Error inserting into MySQL: ", err.message);
        } else {
          console.log("Inserted into MySQL successfully");
        }
      }
    );
    if (result) {
      return res.json({ message: "import success fully" });
    } else {
      return res.json({ message: "import fail" });
    }
  } catch (error) {
    console.log(error);
  }
};

const ShowOrderDetails = async (req, res) => {
  try {
    const role = sessionStorage.getItem("role");
    const OrderDetails = await orderDetail.find();
    return res.render("orderDetails", {
      OrderDetails: OrderDetails,
      title: "Order manager",
      role: role,
      image:
        "https://img.freepik.com/free-vector/vegan-friendly-leaves-label-green-color_1017-25452.jpg?w=740&t=st=1704384258~exp=1704384858~hmac=9fffabebdbb3e16a1cc7fc4ea5bafa4eddebe6687e8ba8e6a9fa177deed34bb7",
      css: "style.css",
    });
  } catch (error) {
    console.log(error);
  }
};

const editOrderDetails = async (req, res) => {
  try {
    let id = req.params.id;
    const orders = await OrderDetail.findById(id);

    return res.render("editOrders", {
      orders: orders,
      title: "Edit Order",
    });
  } catch (error) {
    console.log(error);
  }
};

const updateStatus = async (req, res) => {
  try {
    const id = req.body.id;
    const status = req.body.status;
    const result = await OrderDetail.findByIdAndUpdate(id, { Status: status });
    if (result) {
      console.log("Updated Order status successfully");
      console.log(result);
      res.status(200);
      res.redirect("/ShowOrderDetails");
    } else {
      console.log("Update Failed");
      res.status(404).send("Update Failed");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const showOrderdetailHistory = async (req, res) => {
  const userId = req.body.userId;
  OrderDetail.find({ TokenUser: userId })
    .then((OrderDetail) => {
      res.json({ data: OrderDetail });
    })
    .catch((error) => {
      console.log("Lỗi khi truy vấn lịch sử mua hàng:", error);
    });
};
const deleteOrderDetail = async (req, res) => {
  result = await OrderDetail.findOneAndDelete({ _id: req.params.id });
  if (result) {
    res.json({ success: "Order Delete Successfully" });
  } else {
    res.json({ falied: "Order Delete Falied" });
  }
};

module.exports = {
  saveOrderDetail,
  ShowOrderDetails,
  editOrderDetails,
  updateStatus,
  showOrderdetailHistory,
  deleteOrderDetail,
};
