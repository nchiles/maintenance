const express = require("express");
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

const router = express.Router();

// get equipment list
router.route("/machines").get(function (req, res) {
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

// get single machine by id
router.route("/machines/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let query = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("machines")
    .findOne(query, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// // create new machine.
// router.route("/machine/add").post(function (req, response) {
//   let db_connect = dbo.getDb();
//   let myobj = {
//     person_name: req.body.person_name,
//     person_position: req.body.person_position,
//     person_level: req.body.person_level,
//   };
//   db_connect.collection("machines").insertOne(myobj, function (err, res) {
//     if (err) throw err;
//     response.json(res);
//   });
// });

// get preventative maintenance list
router.route("/preventative-maintenance").get(function (req, res) {
  let db_connect = dbo.getDb("machineDB");
  db_connect
    .collection("preventativeMaintenance")
    .aggregate([
      {$set: {machine_id: { $toObjectId: "$machine_id" } }}, //change machine_id to an ObjectId in order to match machines collection ObjectId's      
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


// update maintenance procedure by id.
router.route("/preventative-maintenance/update/:id")
.post(function (req, response) {
  let db_connect = dbo.getDb('machineDB');
  let query = { _id: ObjectId( req.params.id )};
  // console.log(req.body.update_details)
  let data = 
    { 
      $push: {
        update_details: {      
          update_date: new Date(req.body.update_details[0].update_date),
          update_initials: req.body.update_details[0].update_initials,
          update_notes: req.body.update_details[0].update_notes,
          _id: new ObjectId()
        }
      },           
      $set: {        
        completed_date: req.body.completed_date,
        past_due: req.body.past_due
      }
    }
  console.log(data)
  db_connect
    .collection("preventativeMaintenance")
    .updateOne(query, data, function (err, res) {
      if (err) throw err;
      console.log('1 document updated');
      response.json(res);
    });
});
// router.route("/preventative-maintenance/update/:id")
// .post(function (req, response) {
//   let db_connect = dbo.getDb('machineDB');
//   let query = { _id: ObjectId( req.params.id )};
//   // console.log(query)
//   let updateDetails = {
//     $push: {
//       update_details: {
//         update_date: new Date(),
//         update_initials: "b",
//         update_notes: "",
//         _id: new ObjectId()
//       }      
//     },
//     $set: {
//       completed_date: new Date(),
//       past_due: false
//     }
//   }
//   db_connect
//     .collection("preventativeMaintenance")
//     .updateOne(query, updateDetails, function (err, res) {
//       if (err) throw err;
//       console.log("1 document updated");
//       response.json(res);
//     });
// });

// delete machine
router.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let query = { _id: ObjectId( req.params.id )};
  db_connect.collection("machines").deleteOne(query, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.status(obj);
  });
});

module.exports = router;


// db.preventativeMaintenance.find({ _id: ObjectId('619d46e02be57fb1f85305cd') }).forEach((proc) => { 
//   console.log(proc);
// })

// db.preventativeMaintenance.find({ update_details : { $type: "string" } }).forEach((proc) => { 
//   db.preventativeMaintenance.updateOne(
//     { "_id" : proc._id },
//     { $set: { update_details : [ proc.update_details ] } }
//   ); 
// })