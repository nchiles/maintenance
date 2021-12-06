const express = require("express");

// machineRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /machine.
const machineRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// get list of all the machines.
machineRoutes.route("/machines").get(function (req, res) {
  let db_connect = dbo.getDb("machineDB");
  db_connect
    .collection("machines")
    .find({})
    .sort({vector_name: 1})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

//preventative maintenance list
machineRoutes.route("/machines/preventative-maintenance").get(function (req, res) {
  let db_connect = dbo.getDb("machineDB");
  db_connect
    .collection("preventativeMaintenance")
    .aggregate([
      {$set: {machine_id: {$toObjectId: "$machine_id"} }}, //change machine_id to an ObjectId in order to match machines collection ObjectId's
      { $lookup:
        {
          from: "machines",
          localField: "machine_id", // convert this string to objectId
          foreignField: "_id", 
          as: "machine"
        }
      }
    ])
    .sort({past_due: -1, frequency: 1})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// get single machine by id
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

// create new machine.
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

// update maintenance procedure by id.
machineRoutes.route("/machines/preventative-maintenance/update/:id")
.post(function (req, response) {
  let db_connect = dbo.getDb('machineDB');
  let myquery = { _id: ObjectId( req.params.id )};
  // console.log(myquery)
  let updateDetails = {
    $push: {
      update_details: {
        update_date: new Date(),
        update_initials: "b",
        update_notes: "",
        _id: new ObjectId()
      }      
    },
    $set: {
      completed_date: new Date(),
      past_due: false
    }
  }
  db_connect
    .collection("preventativeMaintenance")
    .updateOne(myquery, updateDetails, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// delete machine
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


// db.preventativeMaintenance.find({ _id: ObjectId('619d46e02be57fb1f85305cd') }).forEach((proc) => { 
//   console.log(proc);
// })

// db.preventativeMaintenance.find({ update_details : { $type: "string" } }).forEach((proc) => { 
//   db.preventativeMaintenance.updateOne(
//     { "_id" : proc._id },
//     { $set: { update_details : [ proc.update_details ] } }
//   ); 
// })