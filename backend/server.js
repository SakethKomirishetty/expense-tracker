//create express app
const exp = require("express");
const app = exp();
const path = require("path");
require("dotenv").config();
//add body parser middleware
app.use(exp.json());
//place react build in http web server
app.use(exp.static(path.join(__dirname, "../frontend/build")));
var cors = require("cors");

app.use(cors()); // Use this after the variable declaration

const mongoClient = require("mongodb").MongoClient;

//connect tp mongodb server
mongoClient
  .connect(process.env.DB_URL)
  .then((client) => {
    //get database object
    const blogDBobj = client.db("expense");
    //create collection objects
    const usersCollection = blogDBobj.collection("users");
    const usersBalance = blogDBobj.collection("usersbalance");
    const usersTest = blogDBobj.collection("userstest");
    // const usersTransfer = blogDBobj.collection("userstransfer");
    //share collection objs with APIs
    app.set("usersCollection", usersCollection);
    app.set("usersBalance", usersBalance);
    app.set("usersTest", usersTest);
    //app.set("usersTransfer", usersTransfer);
    console.log("DB connection success");
  })
  .catch((err) => {
    console.log("Err in DB connect", err);
  });

//import apis
const userApp = require("./user-api");
// const authorApp = require("./APIs/author-api");
// const adminApp = require("./APIs/admin-api");

//handover req to specific route based on starting of path
app.use("/user-api", userApp);
// app.use("/author-api", authorApp);
// app.use("/admin-api", adminApp);

//deals with page refresh
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});
//error handling middeware
app.use((err, req, res, next) => {
  res.send({ status: "error", message: err.message });
});

//get port number from env
const port = process.env.PORT || 4000;

//assign port number to http server
app.listen(port, () => console.log(`http server on port ${port}`));
