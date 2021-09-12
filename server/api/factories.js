const express = require("express");
// const mongoConnector = require('../functions/mongoConnector');
// const bodyParser = require("body-parser");
const { ObjectId } = require("mongodb");
// const client = mongoConnector.getClient();

const router = express.Router();

router.get("/", async (req, res) => {
  // console.log("req.db");
  // console.log(req.db);
  const output = await req.db.collection("factories").find({}).toArray();
  console.log("output");
  console.log(output);
  res.json(output);
});

router.get("/:id", async (req, res) => {
  // console.log("req.params.id");
  // console.log(typeof req.params.id);
  const company = await req.db.collection("factories").findOne({
    inn: parseInt(req.params.id, 10),
  });
  console.log("company");
  console.log(company);
  const products = await req.db
    .collection("products")
    .find({
      manufaturerOGRN: company.ogrn,
    })
    .skip(0)
    .limit(10)
    .toArray();
  const declarations = await req.db
    .collection("declarations")
    .find({
      manufacturer_ogrn: company.ogrn.toString(),
    })
    .skip(0)
    .limit(10)
    .toArray();
  const certificates = await req.db
    .collection("certificates")
    .find({
      applicant_ogrn: company.ogrn.toString(),
    })
    .skip(0)
    .limit(10)
    .toArray();
  const regex = new RegExp(company.fullName, "i");
  const interGasCert = await req.db
    .collection("interGasCert")
    .find({
      manufacturer: { $regex: regex },
    })
    .skip(0)
    .limit(10)
    .toArray();
  const output = {
    products: products,
    declarations: declarations,
    certificates: certificates,
    company: company,
    interGasCert: interGasCert,
  };
  // console.log("output");
  // console.log(output);
  res.json(output);
});

router.delete("/:id", async (req, res) => {
  console.log("req.params.id");
  console.log(req.params.id);
  try {
    await req.db.collection("notes").deleteOne({ _id: ObjectId(req.params.id) });
  } catch (e) {
    console.error(e);
  }
  return res.json(`Note wtih id ${req.params.id} is deleted`);
});

router.get("/:id", async (req, res) => {
  const targetNote = await req.db.collection("notes").findOne({ _id: ObjectId(req.params.id) });
  console.log("targetNote");
  console.log(targetNote);
  return res.json(targetNote);
});

router.put("/:id", async (req, res) => {
  const { text, title } = req.body;
  const targetNote = await req.db.collection("notes").findOne({ _id: ObjectId(req.params.id) });
  await req.db.collection("notes").findOneAndUpdate(
    { _id: ObjectId(req.params.id) },
    {
      $set: {
        html: text,
        title: title,
      },
    }
  );
  return res.json(targetNote._id);
});

router.post("/", async (req, res) => {
  const { text, title } = req.body;
  // console.log(text);
  // console.log(title);
  const user = await req.db.collection("sessions").findOne({
    _id: ObjectId(req.cookies["sessionId"]),
  });
  const now = Date.now();
  const note = await req.db.collection("notes").insertOne({
    html: text,
    title: title,
    created: now,
    isArchived: false,
    userId: user.userId,
  });
  return res.status(201).json({ id: note.insertedId });
});

module.exports = router;
