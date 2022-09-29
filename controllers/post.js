const cloudinary = require('../middleware/cloudinary')
const Post = require('../models/Post')
const User = require('../models/User')

module.exports = {
    getCreate: async (req, res) => {
         res.render('create')
    },
    getBrowse: async (req, res) => {
        try{
            const posts = await Post.find().sort({attending: 'desc'}).lean()
            res.render('browse', {posts: posts, user: req.user})
        } catch (err) {
            console.log(err)
        }
    },
    getEvent: async (req, res) => {
        try {
            const post = await Post.find({_id: req.params.id})
            const user = await User.find({_id: post[0].user}) // I may not need this
            res.render('event', {post:post, user: req.user, poster: user.userName})
        } catch(err) {
            console.log(err)
        }
    },
    attendEvent: async (req, res) => {
        try {
            await Post.findOneAndUpdate(
                {_id: req.params.id},
                {
                    $inc: {attending: 1},
                    $push: {attendee: req.user.id} // if doesn't work try puttig attendee in quotes
                }
            )
            console.log(req.user)
            console.log('attendee added')
            res.redirect(`/post/getEvent/${req.params.id}`)
        } catch(err) {
            console.log(err)
        }
    },
    unattendEvent: async (req, res) => {
        try {
            await Post.findOneAndUpdate(
                {_id: req.params.id},
                {
                    $inc: {attending: -1},
                    $pullAll: {attendee: [req.user.id]}
                }
            )
            console.log(req.user)
            console.log('attendee removed')
            res.redirect(`/post/getEvent/${req.params.id}`)
        } catch(err) {
            console.log(err)
        }
    },
    postCreate: async (req, res) => {
        try {
            // console.log(`req.file is ${req.file}`)
            // const result = await cloudinary.uploader.upload(req.file.path)
            console.log(`req.body is ${req.body}`)
            await Post.create({
                // image: result.secure_url,
                // cloudinaryId: result.public_id, // we need this id and url above to later delete the file from cloudinary
                title: req.body.title, // remember body is from the form's name property
                description: req.body.description,
                caption: req.body.caption,
                country: req.body.country,
                state: req.body.state,
                city: req.body.city,
                street: req.body.street,
                dateTime: req.body.dateTime,
                attending: 1,
                user: req.user.id,
                attendee: [req.user.id]

              });
              console.log("Post has been added!");
              res.redirect("/profile");
        }
        catch (err) {
            console.log(err)
        }
   }
}