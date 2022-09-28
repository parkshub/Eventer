const express = require("express");
const router = express.Router();
const mainController = require("../controllers/main");
const authController = require("../controllers/auth")
const { ensureAuth, ensureGuest } = require("../middleware/auth");


router.get('/', mainController.getIndex)
router.get('/login', authController.getLogin)
router.get('/signup', authController.getSignup)
router.get('/profile', ensureAuth, mainController.getProfile)
router.get('/logout', authController.logout)
router.post("/login", authController.postLogin);
router.post('/signup', authController.postSignup)

module.exports = router