const express = require("express");
const sessionStorage = require("node-sessionstorage");
const User = require("../../backend/Models/account");
const Product = require("../../backend/Models/prodcucts");
const Orderdetail = require("../../backend/Models/OrderDetail");
const handleHomepage = async (req, res) => {
  const dataUser = await User.countDocuments();
  const productCount = await Product.countDocuments();
  const orderCount = await Orderdetail.countDocuments();
  const totalSales = await Orderdetail.aggregate([
    {
      $project: {
        Total: { $sum: "$Total" },
      },
    },
  ]);

  let sum = 0;
  totalSales.forEach((sale) => {
    sum += sale.Total;
  });

  sumfix = sum.toFixed(2);

  return res.render("index.ejs", {
    role: sessionStorage.getItem("role"),
    data: dataUser,
    productCount: productCount,
    orderCount: orderCount,
    countTotal: sumfix,
    title: "home page",
    image:
      "https://img.freepik.com/free-vector/vegan-friendly-leaves-label-green-color_1017-25452.jpg?w=740&t=st=1704384258~exp=1704384858~hmac=9fffabebdbb3e16a1cc7fc4ea5bafa4eddebe6687e8ba8e6a9fa177deed34bb7",
    css: "style.css",
  });
};

module.exports = {
  handleHomepage,
};
