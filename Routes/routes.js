const express = require("express");
const router = express.Router();
const multer = require("multer");
const homeController = require("../Controller/homeController");
const ProductController = require("../Controller/ProdcutController");
const categoryController = require("../Controller/CategoryController");
const userController = require("../Controller/userController");
const orderDetailController = require("../Controller/OrderdetailController");
const postingController = require("../Controller/PostingController");
const accountController = require("../Controller/accountContrller");
const prodcut = require("../Models/prodcucts");
const Category = require("../Models/Category");
const Post = require("../Models/Post");
const connectDB = require("../Config/connectDB");
const OrderDetails = require("../Models/OrderDetail");
const newController = require("../Controller/NewsController");
const mysql = require("mysql2");
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

//save of images
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({
  storage: storage,
}).single("image");

//save form images product
var storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/imageProducts");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var uploadimage = multer({
  storage: storage1,
}).single("image");

//save form images product
var storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/imagepost");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var uploadpost = multer({
  storage: storage2,
}).single("image");

router.get("/dashbroad", homeController.handleHomepage);

router.get("/add", categoryController.HandleAddCategory);

// create category
router.post("/add_category", upload, async (req, res) => {
  const Categories = new Category({
    name: req.body.name,
    desc: req.body.desc,
    image: req.file.filename,
  });
  try {
    //save in mongodb
    await Categories.save();
    // mysql save the category
    const sql =
      "INSERT INTO categories ( `name` ,`desc` ,`image`) VALUES (?,?,?)";
    connection.query(
      sql,
      [req.body.name, req.body.desc, req.file.filename],
      (err, result) => {
        if (err) {
          console.error("Error inserting into MySQL: ", err.message);
        }
        console.log("Inserted into MySQL successfully");
      }
    );
    //
    req.session.message = {
      type: "success",
      message: "User added successfully !",
    };
    res.redirect("/category");
  } catch (err) {
    res.json({ message: err.message, type: "danger" });
  }
});

router.get("/category", categoryController.HandleCategory);

//get form update Category
router.get("/update/:id", categoryController.HandleEditCategory);

router.post("/update/:id", categoryController.HandleUpdateCategory);

//delete category
router.get("/delete/:id", categoryController.handleDeleteCategory);

// managanment Product
router.get("/product", ProductController.handleProducts);

router.get("/addProduct", ProductController.handelAddProduct);

router.post("/saveProduct", uploadimage, async (req, res) => {
  //Insert into mongodb Database
  const prodcuts = new prodcut({
    name: req.body.name,
    price: req.body.price,
    sales: req.body.sales,
    image: req.body.image,
    category_Id: req.body.categoryId,
    status: req.body.status,
    desc: req.body.desc,
  });

  try {
    await prodcuts.save();
    // Insert into mysql database
    const sql =
      "INSERT INTO priductsses(`id` ,`name` , `desc` ,`image` , price , `status` ,sales ,categoryId) values(?,?,?,?,?,?,?,?)";
    connection.query(
      sql,
      [
        req.body._id,
        req.body.name,
        req.body.desc,
        req.body.image,
        req.body.price,
        req.body.status,
        req.body.sales,
        req.body.categoryId,
      ],
      (err, result) => {
        if (err) {
          console.error("Error inserting into MySQL: ", err.message);
        } else {
          console.log("Inserted prodcuts MySQL successfully");
        }
      }
    );
    req.session.message = {
      type: "success",
      message: "Product added successfully !",
    };
    res.redirect("/product");
  } catch (err) {
    res.json({ message: err.message, type: "danger" });
  }
});

//delete products
router.get("/product/delete/:id", ProductController.handelDeleteProduct);
router.get("/product/update/:id", ProductController.handlEditProductPage);

router.post("/product/update/", ProductController.handelUpdateProduct);

//show usser
router.get("/showUser", userController.showUser);

router.post("/user/delete", accountController.deteleUser);

router.get("/user/update/:id", accountController.handelUpdateUsrt);

router.post("/user/update/:id", accountController.handelUpdateUssers);
/// news items
router.get("/showNews", newController.HandleNews);

router.get("/addNews", newController.HandleAddNews);

router.post("/add_news", upload, newController.HandleInsertNews);

router.get("/updateNews/:id", newController.HandleEditNews);

router.post("/updateNews/:id", newController.HandleUpdateNews);

router.get("/deleteNews/:id", newController.HandleDeleteNews);

// Order details
router.post("/OrderDetails/save", orderDetailController.saveOrderDetail);

router.get("/ShowOrderDetails", orderDetailController.ShowOrderDetails);

router.get("/updateOrders/:id", orderDetailController.editOrderDetails);

router.post("/updatestatus/", orderDetailController.updateStatus);

//posting a article
router.post("/posting", uploadpost, async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      desc: req.body.description,
      content: req.body.content,
      username: req.body.username,
      image: req.file.filename,
    });

    const result = await post.save();
    if (result) {
      console.log(result);
      console.log("posting successfully");
      return res.status(200).json({ message: "Đăng bài thành công" });
    } else {
      console.log("posting failed");
      return res.status(500).json({ message: "Đăng bài thất bại" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/api/postAll", postingController.showPostApi);

module.exports = router;
