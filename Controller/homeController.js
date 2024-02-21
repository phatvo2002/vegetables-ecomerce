const express = require("express");
const User = require("../../backend/Models/account")
const handleHomepage = async (req, res) => {
  const dataUser = await User.countDocuments()
  return res.render("index.ejs", {
    data : dataUser,
    title: "home page",
    image:
      "https://img.freepik.com/free-vector/vegan-friendly-leaves-label-green-color_1017-25452.jpg?w=740&t=st=1704384258~exp=1704384858~hmac=9fffabebdbb3e16a1cc7fc4ea5bafa4eddebe6687e8ba8e6a9fa177deed34bb7",
    css: "style.css",
  });
};



module.exports = {
  handleHomepage,
 
};
