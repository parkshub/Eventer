const express = require("express");
const router = express.Router();
// const mainController = require("../controllers/post");
const postController = require('../controllers/post')
// const authController = require("../controllers/auth")
const { ensureAuth, ensureGuest } = require("../middleware/auth");


router.get('/') //this will be the feed, dont need to be logged in for this
router.get('/getCreate', ensureAuth, postController.getCreate) //this will be the feed, dont need to be logged in for this
router.get('/getBrowse', postController.getBrowse)
router.get('/getEvent/:id', postController.getEvent)
router.post('/create', ensureAuth, postController.postCreate)
router.put('/attendEvent/:id', postController.attendEvent)
router.put('/unattendEvent/:id', postController.unattendEvent)

module.exports = router