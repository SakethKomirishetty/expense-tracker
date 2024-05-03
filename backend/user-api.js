//create mini-express app
const exp = require("express");
const userApp = exp.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const {createUserOrAuthor,userOrAuthorLogin}=require('./Util')
const expressAsyncHandler = require("express-async-handler");
// const verifyToken=require('../Middlewares/verifyToken')
let usersCollection;
userApp.use((req, res, next) => {
  usersCollection = req.app.get("usersCollection");
  usersBalance = req.app.get("usersBalance");
  usersTest = req.app.get("usersTest");
  next();
});

//define routes
//user creation
// userApp.post('/user',expressAsynHandler(createUserOrAuthor))
userApp.post(
  "/user",
  expressAsyncHandler(async (req, res) => {
    const usersCollectionObj = req.app.get("usersCollection");

    //get user or autrhor
    const user = req.body;

    //check duplicate user
    //find user by usersname
    let dbuser = await usersCollectionObj.findOne({ username: user.username });
    //if user existed
    if (dbuser !== null) {
      return res.send({ message: "User already existed" });
    }

    //hash password
    const hashedPassword = await bcryptjs.hash(user.password, 7);
    //replace plain pw with hashed pw
    user.password = hashedPassword;

    //save user
    await usersCollectionObj.insertOne(user);
    res.send({ message: "User created" });
  })
);
userApp.post(
  "/insert",
  expressAsyncHandler(async (req, res) => {
    const usersBalanceObj = req.app.get("usersBalance");
    const usersTestObj = req.app.get("usersTest");
    let userCred = req.body;
    let user = userCred.username;
    let ans = await usersTestObj.findOne({ user: userCred.username });
    let budget = ans.userBudget;
    if (budget >= userCred.amount) {
      await usersTestObj.updateOne(
        { user: userCred.username },
        { $inc: { userBudget: -+userCred.amount } }
      );
      await usersBalanceObj.insertOne(userCred);
      res.send({ message: "Inserted" });
    } else {
      res.send({ message: "Insufficient Budget" });
    }
  })
);
userApp.post(
  "/insertBudget",
  expressAsyncHandler(async (req, res) => {
    //const usersBalanceObj = req.app.get("usersBalance");
    const usersTestObj = req.app.get("usersTest");
    let userCred = req.body;
    await usersTestObj.insertOne(userCred);
    res.send({ message: "Inserted" });
  })
);
userApp.post(
  "/insert/transactions",
  expressAsyncHandler(async (req, res) => {
    const usersBalanceObj = req.app.get("usersBalance");
    const usersTestObj = req.app.get("usersTest");
    let userCred = req.body;
    let user = userCred.username;
    let ans = await usersBalanceObj.updateMany({ user: userCred.username });
    let budget = ans.userBudget;
    await usersTestObj.updateOne(
      { user: userCred.username },
      { $inc: { userBudget: +(+userCred.amount) } }
    );
    //await usersBalanceObj.insertOne(userCred);
    res.send({ message: "Inserted" });
  })
);
userApp.post(
  "/delete",
  expressAsyncHandler(async (req, res) => {
    const usersBalanceObj = req.app.get("usersBalance");
    const usersTestObj = req.app.get("usersTest");
    let userCred = req.body;
    let user = userCred.username;
    let id = userCred._id;
    //let ans = await usersTestObj.findOne({ user: userCred.username });
    //let budget = ans.userBudget;
    await usersBalanceObj.updateOne(
      {
        username: user,
        purpose: userCred.purpose,
        amount: userCred.amount,
        category: userCred.category,
        //date: userCred.date,
      },
      { $set: { status: "false" } }
    );
    await usersTestObj.updateOne(
      { user: user },
      { $inc: { userBudget: +(+userCred.amount) } }
    );
    res.send({ message: "Deleted" });
  })
);
userApp.post(
  "/updateBudget/:username",
  expressAsyncHandler(async (req, res) => {
    username = req.params.username;
    //const usersBalanceObj = req.app.get("usersBalance");
    const usersTestObj = req.app.get("usersTest");
    let userObj = req.body;
    let userCred = req.body;
    //await usersTestObj.insertOne(Obj);
    await usersTestObj.updateOne(
      { user: username },
      { $inc: { userBudget: +userObj.userBudget } }
    );
    res.send({ message: "Inserted" });
  })
);
userApp.get(
  "/get/:username",
  expressAsyncHandler(async (req, res) => {
    const usersBalanceObj = req.app.get("usersBalance");
    let user = req.params.username;
    let res1 = await usersBalanceObj
      .find({ username: user, status: "true" })
      .toArray();
    res.send({ message: "Fetch", payload: res1 });
  })
);
userApp.get(
  "/get/:username/find",
  expressAsyncHandler(async (req, res) => {
    const usersTestObj = req.app.get("usersTest");
    let user = req.params.username;
    let response = await usersTestObj.find({ user: user }).toArray();
    console.log(response);
    res.send({ message: "Fetch", payload: response });
  })
);
//user login
userApp.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    const usersCollectionObj = req.app.get("usersCollection");
    //get user or autrhor
    const userCred = req.body;
    //verifuy username of user
    let dbuser = await usersCollectionObj.findOne({
      username: userCred.username,
    });
    if (dbuser === null) {
      return res.send({ message: "Invalid username" });
    } else {
      let status = await bcryptjs.compare(userCred.password, dbuser.password);
      console.log(status);
      if (status === false) {
        return res.send({ message: "Invalid password" });
      } else {
        //create token
        const signedToken = jwt.sign(
          { username: dbuser.username },
          `${process.env.SECRET_KEY}`,
          { expiresIn: "1h" }
        );
        delete dbuser.password;
        res.send({
          message: "login success",
          token: signedToken,
          user: dbuser,
        });
      }
    }
  })
);
module.exports = userApp;
