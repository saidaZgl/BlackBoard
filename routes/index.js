var express = require("express");
var router = express.Router();

const articleModel = require("../models/articles");
const orderModel = require("../models/orders");
const userModel = require("../models/users");

/* GET home page. */
router.get("/", async function (req, res, next) {
  const emptyStocks = await articleModel.find({ stock: 0 });

  const user = await userModel.findById("5c52e4efaa4beef85aad5e52");

  const messages = user.messages;

  let unreadMessages = 0;
  for (let i = 0; i < messages.length; i++) {
    if (messages[i].read == false) {
      unreadMessages += 1;
    }
  }
  const taches = user.tasks;
  let tasksInprogress = 0;

  for (let i = 0; i < taches.length; i++) {
    if (taches[i].dateCloture == null) {
      tasksInprogress += 1;
    }
  }

  res.render("index", {
    emptyStocks: emptyStocks.length,
    unreadMessages,
    tasksInprogress,
  });
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
router.get("/charts", async function (req, res, next) {
  const users = await userModel.find();

  let numMale = 0;
  let numFemale = 0;

  for (let i = 0; i < users.length; i++) {
    if (users[i].gender == "male") {
      numMale++;
    } else {
      numFemale++;
    }
  }

  const user = await userModel.findById("5c52e4efaa4beef85aad5e52");

  const messages = user.messages;

  let messNonLus = 0;
  let messLus = 0;
  for (let i = 0; i < messages.length; i++) {
    if (messages[i].read == false) {
      messNonLus += 1;
    } else {
      messLus += 1;
    }
  }

  const orders = await orderModel.find({ status_payment: "validated" });

  let nbExp = 0;
  let nbNonExp = 0;

  for (let i = 0; i < orders.length; i++) {
    if (orders[i].status_shipment == true) {
      nbExp++;
    } else {
      nbNonExp++;
    }
  }

  var aggr = orderModel.aggregate();

  aggr.match({ status_payment: "validated" });

  aggr.group({
    _id: { year: { $year: "$date_insert" }, month: { $month: "$date_insert" } },
    CA: { $sum: "$total" },
  });

  aggr.sort({ _id: 1 });

  var totalCAByMonth = await aggr.exec();

  res.render("charts", {
    numMale,
    numFemale,
    messNonLus,
    messLus,
    nbExp,
    nbNonExp,
    totalCAByMonth,
  });
});

module.exports = router;
