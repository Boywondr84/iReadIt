const router = require("express").Router();
const { User } = require("../../models");
const { default: axios } = require("axios");


// axios get user route
axios({
  url: '/api/users',
  headers: { 'Content-Type': 'application/json' }
})
.then(function (response) {
  console.log(response.data);
})
.catch(function (error) {
  console.log(error);
});

// router.get("/", (req, res) => {
//   User.findAll({
//     attributes: {},
//   })
//     .then((dbUserData) => {
//       res.json(dbUserData);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

//post route to create new user .then sign them in to a session...
router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbUserData) => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json({ user: dbUserData, message: "You are now logged in!" });
        console.log("YOU are logged in!");
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: "User not found" });
      return;
    }
    //validate user logic..
    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: "You are now logged in!" });
      console.log(req.session);
    });
  });
});

//logout button on front end fetches with POST method to logout(destroy session)
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
      console.log("YOU are logged out!");
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
