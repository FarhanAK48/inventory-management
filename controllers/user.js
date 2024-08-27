const db = require("../db.config");
const User = db.User;

const findOneUSer = (req, res) => {
  User.findOne({
    where: { id: req.params.userId },
  })
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((error) => {
      console.log("error***", error);
      res.status(500).send({ message: "Some Error" });
    });
};
const addUser = (req, res) => {
  const customerData = {
    name: req.body.name,
    password: req.body.password,
  };
  User.create(customerData)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((error) => {
      console.log("error***", error);
      res.status(500).send({ message: "Some Error" });
    });
};

const getAllUsers =async (req, res) => {
  // const {name,password} =  req.body;
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  // Calculate offset
  const offset = (page - 1) * pageSize;
console.log('oFF', offset)
  try {
    const results = await User.findAndCountAll({
      limit: pageSize,
      offset: offset,
    });

    res.json({
      data: results.rows,
      totalItems: results.count,
      totalPages: Math.ceil(results.count / pageSize),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
  // User.findAll()
  //   .then((data) => {
  //     res.status(200).send(data);
  //   })
  //   .catch((error) => {
  //     console.log("error***", error);
  //     res.status(500).send({ message: "Some Error" });
  //   });
};

function updateUser(req, res) {
  const userData = {
    id: req.body.id,
    name: req.body.name,
    password: req.body.password,
  };
  User.update(userData, { where: { id: req.body.id } })
    // .then((data) => {
    //   res.send("Data updated successfully;", data);
    // })
    // .catch((err) => {
    //   res.status(503).send(err);
    // });
    .then((result) => {
      if (result[0] === 1) {
        // result[0] contains the number of affected rows
        res.send("Data updated successfully.");
      } else {
        res.status(404).send("User not found or no changes made.");
      }
    })
    .catch((err) => {
      res.status(503).send({
        message: "An error occurred while updating the user.",
        error: err.message,
      });
    });
}

// function deleteUser(req, res) {
//   User.destroy({ where: { id: req.body.id } })
//     .then((data) => {
//       res.send("Record Deleted successfully;", data);
//     })
//     .catch((err) => {
//       res.status(503).send(err);
//     });
// }
function deleteUser(req, res) {
  User.destroy({ where: { id: req.body.id } })
    .then((rowsDeleted) => {
      if (rowsDeleted === 0) {
        return res
          .status(404)
          .send({ message: "No record found with the specified ID." });
      }
      res.send({ message: "Record deleted successfully." });
    })
    .catch((err) => {
      console.error("Error deleting record:", err);
      res.status(503).send({ message: "Error deleting record.", error: err });
    });
}

module.exports = {
  addUser,
  getAllUsers,
  updateUser,
  deleteUser,
  findOneUSer,
};
