const User = require("../models/user.model");

//create user
exports.create = (req, res) => {
  if (!req.body.username) {
    return res.status(400).send({
      message: "Please enter info user",
    });
  }
  //create user
  const user = new User({
    username: req.body.username,
    url: req.body.url,
    avatar_url: req.body.avatar_url,
  });

  //save to mongo db
  user
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the users.",
      });
    });
};

//return user list
exports.findAll = (req, res) => {
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

//find user by id
exports.findOne = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return req.status(404).send({
          message: "User not found with id " + req.params.id,
        });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error retrieving user with id " + req.params.id,
      });
    });
};

//update user
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.username || !req.body.url || !req.body.avatar_url) {
    return res.status(400).send({
      message: "user can not be empty",
    });
  }

  // Find note and update it with the request body
  User.findByIdAndUpdate(
    req.params.id,
    {
      username: req.body.username,
      url: req.body.url,
      avatar_url: req.body.avatar_url,
    },
    { new: true }
  )
    .then((note) => {
      if (!note) {
        return res.status(404).send({
          message: "User not found with id " + req.params.id,
        });
      }
      res.send(note);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error retrieving user with id " + req.params.id,
      });
    });
};

//delete user by id
exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.id,
        });
      }
      res.send({ message: "User deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "User not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Could not delete user with id " + req.params.id,
      });
    });
};
