const mysql = require("mysql2");
const Comment = require("../Models/Comemnt");
const CommentSql = require("../Models/coments");
const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "vegetable_app",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const handlePostingComment = async (req, res) => {
  try {
    const comment = new Comment(req.body);
    const result = await comment.save(); 
    if(result){
        res.status(200).json({message: "Insert Successfully"})
    }
    else
    {
        res.status(404).json({message: "Insert Failed"})
    }

    const sql =
      "INSERT INTO coments ( `content` ,`idProduct` ,`nameUser`) VALUES (?,?,?)";
    connection.query(
      sql,
      [req.body.Content, req.body.idProduct, req.body.nameUser],
      (err, result) => {
        if (err) {
          console.error("Error inserting into MySQL: ", err.message);
        }
        console.log("Inserted into MySQL successfully");
      }
    );
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const handelShowCommentID = (req, res) =>
{
    const id = req.query.idProduct;
    try {
      const sql =
      "SELECT * FROM coments WHERE idProduct = ?";
    connection.query(
      sql,
      [id],
      (err, result) => {
        if (err) {
          console.error( err.message);
        }
         res.status(200).send(result);
      }
    );
    } catch (error) {
      res.status(500).json({ error: error });
    }  
}

const handelDeleteComment = async (req, res) =>{
    try {
      const id = req.body.id 
      const result = await Comment.deleteOne(id)
      if(result){
        res.status(200).send({message: 'Comment deleted successfully'});
      }else
      {
        res.status(404).send({message: 'Comment failed'});
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
}

module.exports = {
    handlePostingComment,
    handelShowCommentID,
    handelDeleteComment
}