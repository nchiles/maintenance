const express = require("express");

// machineRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /machine.
const machineRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the machines.
machineRoutes.route("/machines").get(function (req, res) {
  let db_connect = dbo.getDb("machineDB");
  db_connect
    .collection("machines")
    .find({})
    .sort({vectorName: 1})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

//preventative maintenance list
machineRoutes.route("/machines/preventative-maintenance").get(function (req, res) {
  let db_connect = dbo.getDb("machineDB");
  db_connect
    .collection("machines")
    .find({ preventativeMaintenance: { $exists: true } })
    .sort({vectorName: 1})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single machine by id
machineRoutes.route("/machines/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
    .collection("machines")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you create a new machine.
machineRoutes.route("/machine/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    person_name: req.body.person_name,
    person_position: req.body.person_position,
    person_level: req.body.person_level,
  };
  db_connect.collection("machines").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a machine by id.
machineRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
      person_name: req.body.person_name,
      person_position: req.body.person_position,
      person_level: req.body.person_level,
    },
  };
  db_connect
    .collection("machines")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a machine
machineRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("machines").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.status(obj);
  });
});

module.exports = machineRoutes;