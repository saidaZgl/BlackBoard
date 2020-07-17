var express = require("express");
var router = express.Router();

const articleModel = require("../models/articles");
const orderModel = require("../models/orders");
const userModel = require("../models/users");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

/* GET tasks page. */
router.get("/tasks-page", async function (req, res, next) {
  const user = await userModel.findById("5c52e4efaa4beef85aad5e52");
  res.render("tasks", { taches: user.tasks });
});

/* GET Messages page. */
router.get("/messages-page", async function (req, res, next) {
  const user = await userModel.findById("5c52e4efaa4beef85aad5e52");
  res.render("messages", { messages: user.messages });
});

/* GET Users page. */
router.get("/users-page", async function (req, res, next) {
  const users = await userModel.find({ status: "customer" });
  res.render("users", { users });
});

/* GET Catalog page. */
router.get("/catalog-page", async function (req, res, next) {
  const articles = await articleModel.find();

  res.render("catalog", { articles });
});

/* GET Orders-list page. */
router.get("/orders-list-page", async function (req, res, next) {
  const orders = await orderModel.find();

  res.render("orders-list", { orders });
});

/* GET Order detail page. */
router.get("/order-page", async function (req, res, next) {
  const order = await orderModel
    .findById(req.query.id)
    .populate("articles")
    .exec();

  res.render("order", { order });
});

/* GET chart page. */
router.get("/charts", function (req, res, next) {
  res.render("charts");
});

module.exports = router;
