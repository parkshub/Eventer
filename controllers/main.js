const cloudinary = require("../middleware/cloudinary");
// const Post = require("../models/User");
const Post = require("../models/Post");

module.exports = {
    getIndex: async (req, res) => {
      try {
        let len;
        const posts = await Post.find().sort({attending: 'desc'}).lean()
        if (posts.length < 4) {
          len = posts.length
        } else {
          len = 4
        }
        const topPosts = posts.slice(0, len)
        res.render("home.ejs", {topPosts: topPosts, user:req.user});
      } catch (err) {
        console.log(err)
      }
    },
    // login: (req, res) => {
    //   res.render("login.ejs")
    // }
    getProfile: async (req, res) => {
      try {const user = req.user.userName
      console.log(req.user.id)
      const posts = await Post.find({user:req.user.id})
      res.render("profile", {user:user, posts:posts})
    } catch (err) {
      console.log(err)
    }
    }
  };
  