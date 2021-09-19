const express = require("express");
// const mongoConnector = require('../functions/mongoConnector');
// const bodyParser = require("body-parser");
// const { ObjectId } = require("mongodb");
// const client = mongoConnector.getClient();

const router = express.Router();

router.get("/", async (req, res) => {
  // console.log("req.db");
  // console.log(req.db);
  // await req.db.collection("kamkabelStorage").deleteMany( { "city" : "Санкт-Петербург" } );
  const onStore = await req.db
    .collection("kamkabelStorage")
    .find({
      quantity: { $gt: 0 },
    })
    .toArray();
  const mostFast = await req.db
    .collection("kamkabelStorage")
    .find({
      quantity: 0,
      dateOfAppear: "2021-08-30T00:00:00.000Z",
    })
    .sort({
      dateOfDissapear: 1,
    })
    .limit(5)
    .toArray();
  const all = await req.db.collection("kamkabelStorage").find({}).toArray();

  const mostWeight = [];

  for (let item of all) {
    const targetPositionIndex = mostWeight.findIndex((obj) => item.nomenclature === obj.nomenclature);
    if (targetPositionIndex === -1) {
      const soldNumb = item.initialQuantity - item.quantity;
      mostWeight.push({
        nomenclature: item.nomenclature,
        unitOfMeasure: item.unitOfMeasure,
        sold: parseFloat(soldNumb.toFixed(3)),
      });
    } else {
      const soldNumb = item.initialQuantity - item.quantity + mostWeight[targetPositionIndex].sold;
      mostWeight[targetPositionIndex].sold = parseFloat(soldNumb.toFixed(3));
    }
  }

  const mostWeingNotNull = [];

  for (let item of mostWeight) {
    if (item.sold > 0) {
      mostWeingNotNull.push(item);
    }
  }

  mostWeingNotNull.sort(function (a, b) {
    return b.sold - a.sold;
  });

  mostWeingNotNull.splice(5, mostWeingNotNull.length - 5);

  // console.log("mostFast");
  // console.log(mostFast);
  res.json({ onStore: onStore, mostFast: mostFast, mostWeight: mostWeingNotNull });
});

module.exports = router;
