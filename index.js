import env from "dotenv";
import express from "express";
env.config({ path: "./config/.env" });
import router from "./routes/router.js";
import client from "./dbConnection/dbConnection.js";
const port = process.env.PORT;

// Middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/", router);

// default engine
app.set("view engine", "ejs");

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
