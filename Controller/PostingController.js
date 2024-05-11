const Post = require("../Models/Post");
const multer = require("multer");

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
const handlePosting = async (req, res) => {
  try {
    // Xử lý tệp tin được tải lên trước khi lưu thông tin vào database
    upload(req, res, async function (err) {
      if (err) {
        // Xử lý lỗi nếu có
        return res.status(500).json({ message: "Tải lên tệp tin thất bại" });
      }

      // Lưu thông tin vào database
      const post = new Post({
        title: req.body.title,
        desc: req.body.desc,
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
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const showPostApi = async (req, res) => {
  try {
    const post = await Post.find();
    if (post) {
    
      res.json(post);

    } else {
      return res.status(404).json({ message: "No results found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const handelShowPostByid = async (req, res) => {
  const id = req.params.id
  try {
   
    const result = await Post.findById(id);
    if(result)
    {
      res.json({result:result});
    }
    else
    {
      return res.status(404).json({ message: "error when call api " });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  handlePosting,
  showPostApi,
  handelShowPostByid
};
