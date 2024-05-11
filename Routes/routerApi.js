const express = require("express");
const router = express.Router();
const Category = require("../Models/Category");
const Prodcucts = require("../Models/prodcucts");
const connectDB = require("../Config/connectDB");
const PostingController = require("../Controller/PostingController");
const newController = require("../Controller/NewsController");
const CommentController = require("../Controller/CommentsController");
const CategoryController = require("../Controller/CategoryController");
const ProductController = require("../Controller/ProdcutController");
const CartController = require("../Controller/CartController");
const OrderdetailController = require("../Controller/OrderdetailController");
const mysql = require("mysql2");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "vegetable_app",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

//category api
router.get("/api/category", CategoryController.handelCategoryApi);

router.get("/api/category=:id", CategoryController.handleCategoryApiFindID);

router.get("/api/products", async (req, res) => {
  try {
    const products = await Prodcucts.find().populate("categoryId");
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//products api
router.post("/api/products/sql", ProductController.handelSortProductApi);

router.get("/api/products/:id", ProductController.handleShowProductsById);

router.get(
  "/api/products/search/:name",
  ProductController.handelSearchProductByName
);

router.get('/api/productsSale/Show', ProductController.handleShowProductsSaleOff)

//Cart api
router.post("/api/v1/addToCart", CartController.handelAddtoCart);

router.get("/api/v1/showCart", CartController.handleShowAllCarrt);

router.get("/api/v1/showCart/:token", CartController.handleShowCartByToken);

router.post("/api/v1/deleteItem/cart/:id", CartController.deleteCartById);


// show post api
router.get("/api/showPost/:id",PostingController.handelShowPostByid )
router.get("/api/postAll", PostingController.showPostApi);

//orderdetail api
router.post("/api/orderdetail", OrderdetailController.showOrderdetailHistory);

router.post("/api/deleteOrder/:id", OrderdetailController.deleteOrderDetail);
//show all new
router.get("/api/news", newController.newShowAllApi);

router.get("/api/showNew/:id", newController.handelNewShowId);
// comment api
router.post("/api/post/comment", CommentController.handlePostingComment);

router.get("/api/comment", CommentController.handelShowCommentID);


module.exports = router;
