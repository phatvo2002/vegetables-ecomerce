const Cart = require("../Models/cart");

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

const handelAddtoCart = (req, res) => {
  const sql = `INSERT INTO carts(nameProduct,price,quantity,total,id_product,image,token) Values (?,?,?,?,?,?,?)`;
  const nameProduct = req.body.nameProduct;
  const price = req.body.price;
  const quantity = req.body.quantity;
  const total = quantity * price;
  const id_product = req.body.id_product;
  const image = req.body.image;
  const token = req.body.token;
  connection.query(
    sql,
    [nameProduct, price, quantity, total, id_product, image, token],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(200).json({ success: "Insert successfully" });
      }
    }
  );
};

const handleShowAllCarrt = (req, res) => {
  const sql = "SELECT * FROM carts";
  connection.query(sql, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json(results);
    }
  });
};

const handleShowCartByToken = (req, res) => {
  const token = req.params.token;
  const sql = "SELECT * FROM carts where token = ?";
  connection.query(sql, [token], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json(results);
    }
  });
};

const deleteCartById = (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM carts WHERE id = ?";
    connection.query(sql, [id], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(200).json({ success: "delete cart successfully" });
      }
    });
}

module.exports = {
  handelAddtoCart,
  handleShowAllCarrt,
  handleShowCartByToken,
  deleteCartById
};
