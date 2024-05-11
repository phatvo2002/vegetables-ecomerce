const Category = require("../Models/Category");
const categories = require("../Models/Category");
const prodcucts = require("../Models/priductss");
const products = require("../Models/prodcucts");
const mysql = require("mysql2");
const Swal = require("sweetalert2");
const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "vegetable_app",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
const handleProducts = async (req, res) => {
  const product = await products.find();
  return res.render("products", {
    title: "All Products",
    css: "style.css",
    product: product,
    image:
      "https://img.freepik.com/free-vector/vegan-friendly-leaves-label-green-color_1017-25452.jpg?w=740&t=st=1704384258~exp=1704384858~hmac=9fffabebdbb3e16a1cc7fc4ea5bafa4eddebe6687e8ba8e6a9fa177deed34bb7",
  });
};

const handelAddProduct = async (req, res) => {
  const catemb = await Category.find();
  const sql = "SELECT * FROM categories ";

  connection.query(sql, (err, result) => {
    if (err) {
      console.log("Error fetching categories");
      return res.status(500).send("Internal Server Error");
    }
    // Pass the result to the render function
    return res.render("addProducts", {
      title: "Add Products",
      css: "style.css",
      catemb: catemb,
      categories: result, // Use a more descriptive name like 'categories' instead of 'categorySql'
      image:
        "https://img.freepik.com/free-vector/vegan-friendly-leaves-label-green-color_1017-25452.jpg?w=740&t=st=1704384258~exp=1704384858~hmac=9fffabebdbb3e16a1cc7fc4ea5bafa4eddebe6687e8ba8e6a9fa177deed34bb7",
    });
  });
};

const handlEditProductPage = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send("ID parameter is missing or invalid.");
    }

    const product = await products.findById(id);
    if (!product) {
      return res.status(404).send("Product not found.");
    }

    return res.render("editProduct", {
      title: "Edit Products",
      product: product, // Pass the product data to the template
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

const handelUpdateProduct = async (req, res) => {
  try {
    let id = req.body.id;
    const product = await products.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        price: req.body.price,
        sales: req.body.sales,
        status: req.body.status,
      },
      { new: true }
    );
    if (product) {
      console.log("update success");
      res.redirect("/product");
    } else {
      console.log("update failure");
    }
  } catch (error) {
    console.error(error);
  }
};

//delete Products
const handelDeleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    await products.findByIdAndDelete(id);
    // Redirect with a message
    req.session.message = {
      type: "info",
      message: "Product deleted successfully",
    };

    return res.redirect("/product");
  } catch (error) {
    return res.json({ message: error });
  }
};
const handleAddProduct = (req, res) => {
  async (req, res) => {
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
            Swal.fire({
              icon: "success",
              title: "Product Add Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      );
      Swal.fire({
        icon: "success",
        title: "Product Add Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      res.redirect("/product");
    } catch (err) {
      res.json({ message: err.message, type: "danger" });
    }
  };
};
//update product

//api product
const handelSortProductApi = (req, res) => {
  try {
    const valueSort = req.body.valueSort;
    if (valueSort == "A-Z") {
      const sql =
        "SELECT priductsses.name as productname , categories.name as categoryname , priductsses.id , priductsses.desc ,priductsses.price ,priductsses.sales,priductsses.image FROM priductsses JOIN categories on priductsses.categoryId = categories.id  ORDER BY priductsses.price DESC";
      connection.query(sql, (err, result) => {
        if (err) {
          console.error("SQL Error:", err);
          return res.json({ Message: "Error in SQL query" });
        }
        return res.json(result);
      });
    } else if (valueSort == "Z-A") {
      const sql =
        "SELECT priductsses.name as productname , categories.name as categoryname , priductsses.id , priductsses.desc ,priductsses.price ,priductsses.sales,priductsses.image FROM priductsses JOIN categories on priductsses.categoryId = categories.id  ORDER BY priductsses.price ASC";
      connection.query(sql, (err, result) => {
        if (err) {
          console.error("SQL Error:", err);
          return res.json({ Message: "Error in SQL query" });
        }
        return res.json(result);
      });
    } else {
      const sql =
        "SELECT priductsses.name as productname , categories.name as categoryname , priductsses.id , priductsses.desc ,priductsses.price ,priductsses.sales,priductsses.image FROM priductsses JOIN categories on priductsses.categoryId = categories.id  ";
      connection.query(sql, (err, result) => {
        if (err) {
          console.error("SQL Error:", err);
          return res.json({ Message: "Error in SQL query" });
        }
        return res.json(result);
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

const handleShowProductsById = (req, res) => {
  try {
    const sql = "SELECT * FROM priductsses WHERE id = ?";
    const id = req.params.id;
    connection.query(sql, [id], (err, result) => {
      if (err) {
        console.error("SQL Error:", err);
        return res.json({ Message: "Error in SQL query" });
      }
      return res.json(result);
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

const handelSearchProductByName = (req, res) => {
  const sql = `SELECT * FROM priductsses WHERE name = ?`;
  const name = req.params.name;
  connection.query(sql, [name], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
};

const handleShowProductsSaleOff = (req, res) => {
      try {
        const sql = `SELECT * FROM priductsses  WHERE sales > 10 LIMIT 4` 
        connection.query(sql,  (error, results) => {
          if (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
          } else {
            res.json(results);
          }
        });
      } catch (error) {
         res.status(500).json({ error: "Internal Server Error" });
      }
}

module.exports = {
  handleProducts,
  handelAddProduct,
  handelDeleteProduct,
  handleAddProduct,
  handelSortProductApi,
  handleShowProductsById,
  handelSearchProductByName,
  handlEditProductPage,
  handelUpdateProduct,
  handleShowProductsSaleOff
};
