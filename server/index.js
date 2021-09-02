require("dotenv").config();
// const fs = require('fs');
// const { fillMongoBaseFromText } = require("./functions/fillMongoBaseFromText");
const express = require("express");
// const cors = require('cors')
const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const mongoConnector = require("./functions/mongoConnector");

// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use("/declarations", require("./api/declarations"));
// const { MongoClient, ObjectId } = require("mongodb");

// const clientPromise = MongoClient.connect(process.env.DB_URI, {
//   useUnifiedTopology: true,
//   maxPoolSize: 10,
// });

// let client;
let database;

const connectMongo = async () => {
  const connected = await mongoConnector.connectToServer();
  if (connected === "connected") {
    database = mongoConnector.getDb();
    // client = database.db("cabletest");
    // client = mongoConnector.getClient();
  }
};

app.use((req, res, next) => {
  console.log("app use test");
  try {
    req.db = database.db("cabletest");
    // console.log('req.db');
    // console.log(req.db);
    next();
  } catch (err) {
    next(err);
  }
});

// const propertyDeclArr = [
//   'id_decl',
//   'reg_number',
//   'decl_status',
//   'decl_type',
//   'date_beginning',
//   'date_finish',
//   'declaration_scheme',
//   'product_object_type_decl',
//   'product_type',
//   'product_group',
//   'product_name',
//   'asproduct_info',
//   'product_tech_reg',
//   'organ_to_certification_name',
//   'organ_to_certification_reg_number',
//   'basis_for_decl',
//   'old_basis_for_decl',
//   'applicant_type',
//   'person_applicant_type',
//   'applicant_ogrn',
//   'applicant_inn',
//   'applicant_name',
//   'manufacturer_type',
//   'manufacturer_ogrn',
//   'manufacturer_inn',
//   'manufacturer_name'
// ];

// const propertyCertArr = [
//   'id_cert',
//   'cert_status',
//   'cert_type',
//   'reg_number',
//   'date_begining',
//   'date_finish',
//   'product_scheme',
//   'product_object_type_cert',
//   'product_type',
//   'product_okpd2',
//   'product_tn_ved',
//   'product_tech_reg',
//   'product_group',
//   'product_name',
//   'product_info',
//   'applicant_type',
//   'person_applicant_type',
//   'applicant_ogrn',
//   'applicant_inn',
//   'applicant_phone',
//   'applicant_fax',
//   'applicant_email',
//   'applicant_website',
//   'applicant_name',
//   'applicant_director_name',
//   'applicant_address',
//   'applicant_address_actual',
//   'manufacturer_type',
//   'manufacturer_ogrn',
//   'manufacturer_inn',
//   'manufacturer_phone',
//   'manufacturer_fax',
//   'manufacturer_email',
//   'manufacturer_website',
//   'manufacturer_name',
//   'manufacturer_director_name',
//   'manufacturer_country',
//   'manufacturer_address',
//   'manufacturer_address_actual',
//   'manufacturer_address_filial',
//   'organ_to_certification_name',
//   'organ_to_certification_reg_number',
//   'organ_to_certification_head_name',
//   'basis_for_certificate',
//   'old_basis_for_certificate',
//   'fio_expert',
//   'fio_signatory',
//   'product_national_standart',
//   'production_analysis_for_act',
//   'production_analysis_for_act_number',
//   'production_analysis_for_act_date'
// ];

(async () => {
  // app.set('view engine', 'html');
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  // app.use(cors());
  // app.use('/static', express.static(__dirname + '/public'));
  app.use("/declarations", require("./api/declarations"));
  app.use("/factories", require("./api/factories"));
  app.use(express.static(path.resolve(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
  await connectMongo();

  // app.get("/", (req, res) => {
  //   res.render("index");
  // });
  // app.use((req, res, next) => {
  //   console.log('app use test');
  //   try {
  //     req.db = database.db("testlib");
  //     console.log('req.db');
  //     console.log(req.db);
  //     next();
  //   } catch (err) {
  //     next(err);
  //   }
  // });
  // client = connectionMongo.db('testlib');
  // console.log('client');
  // console.log(client);

  // await fillMongoBaseFromText('./rawdata/rifarSerts.txt', client, 'certificates', [], true);

  // pathToFile, database, collection, properties
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`  Listening on http://localhost:${port}`);
  });
})();

// const port = process.env.PORT || 3000;

// app.listen(port, () => {
//   console.log(`  Listening on http://localhost:${port}`);
// });
