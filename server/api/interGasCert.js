const express = require("express");
// const mongoConnector = require('../functions/mongoConnector');
// const bodyParser = require("body-parser");
// const { ObjectId } = require("mongodb");
// const client = mongoConnector.getClient();

const router = express.Router();

router.get("/", async (req, res) => {
  // console.log("req.db");
  // console.log(req.db);
  const output = await req.db.collection("interGasCert").find({}).limit(20).toArray();
  // console.log("output");
  // console.log(output);
  res.json(output);
});

module.exports = router;
