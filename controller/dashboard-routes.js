const router = require("express").Router();
const { Book, Review, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, (req, res) => {
  Book.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "title", "author", "user_id", "created_at"],
    include: [
      {
        model: Review,
        attributes: ["id", "review_text", "user_id", "book_id"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbData) => {
      const books = dbData.map((post) => post.get({ plain: true }));
      res.render("dashboard", { books, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//experiment with this and the edit-review handlebars page..**
// router.get("/review/:id", withAuth, (req, res) => {
//   Review.findOne({
//     where: {
//       id: req.params.id,
//     },
//     attributes: ["id", "book_id", "review_text", "user_id", "created_at"],
//     include: [
//       {
//         model: Book,
//         attributes: ["id", "title"],
//       },
//       {
//         model: User,
//         attributes: ["id", "username"],
//       },
//     ],
//   })
//     .then((dbPostData) => {
//       if (!dbPostData) {
//         res.status(404).json({ message: "no review by that id!" });
//         return;
//       }
//       //serialize
//       const review = dbPostData.get({ plain: true });

//       res.render("edit-review", { review, loggedIn: true });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

module.exports = router;
