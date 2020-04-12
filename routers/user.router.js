// const express = require('express')
// const User = require('../models/User')
// const auth = require('./auth')
// const router = express.Router()

// router.post('/users', async (req, res) => {
//     // Create a new user
//     try {
//         const user = new User(req.body)
//         await user.save()
//         const token = await user.generateAuthToken()
//         res.status(201).send({
//             user,
//             token,
//             message: 'save successful'
//         })
//     } catch (error) {
//         res.status(400).send({
//             message: 'loi khong xac dinh' || error
//         })
//     }
// })

// router.post('/users/login', async (req, res) => {
//     //Login a registered user
//     try {
//         const { email, password } = req.body
//         const user = await User.findByCredentials(email, password)
//         if (!user) {
//             return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
//         }
//         const token = await user.generateAuthToken()
//         res.send({ user, token })
//     } catch (error) {
//         res.status(400).send({
//             message: "loi khong xac dinh" || error
//         })
//     }

// })
// router.get('/users/me', auth, async (req, res) => {
//     // View logged in user profile
//     res.send(req.user)
// })
// router.post('/users/me/logout', auth, async (req, res) => {
//     // Log user out of the application
//     try {
//         req.user.tokens = req.user.tokens.filter((token) => {
//             return token.token != req.token
//         })
//         await req.user.save()
//         res.send()
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

// router.post('/users/me/logoutall', auth, async (req, res) => {
//     // Log user out of all devices
//     try {
//         req.user.tokens.splice(0, req.user.tokens.length)
//         await req.user.save()
//         res.send()
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })
// module.exports = router

// const express = require('express');
// const app = express();

// app.use('/api', require('./api'));

// module.exports = app;

var VerifyToken = require(__root + 'auth/VerifyToken');
module.exports = app => {
  const users = require("../controllers/users");
  app.post("/register", users.create);
  app.get("/getUsers", users.getUsers);
  app.post("/login", users.login);
  app.post("/testEmail", users.testEmail);
  app.post("/loginv2", users.login);
  app.post("/addPoint", VerifyToken,users.addPoint);
  app.post("/removePoint",VerifyToken, users.removePoint);
  app.post("/updateRole", users.updateRole);
  app.post("/updateReport", users.updateReport);
  app.post("/bannedUser", users.bannedUser);
  app.post("/updateUser", users.updateUser);
  app.post("/changePassword", users.changePassword);
  app.post("/resetPassword", users.resetPassword);
  app.get("/logout", users.logout);
  app.get("/getTopUsers",users.getTopUsers);
  app.get("/getNewUsers",users.getNewUsers);
  app.get('/active/:id', users.activeMember)
  app.get('/getMemerInfo/:id', users.getMemerInfo)
};
