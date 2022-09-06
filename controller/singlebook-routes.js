const router = require("express").Router();
const { Book, Review, User } = require("../models");
const withAuth = require("../utils/auth");


router.get("/editReview/:id", withAuth, (req, res) => {
    Review.findOne({
      where: {
        id: req.params.id,
       },
      attributes: ["id", "book_id", "review_text", "user_id", "created_at"],
      include: [
        {
          model: Book,
          attributes: ["id", "title"],
        },
        {
          model: User,
          attributes: ["id", "username"],
        },
      ],
    })
      .then((dbPostData) => {
        if (!dbPostData) {
          res.status(404).json({ message: "no review by that id!"});
          return;
        }
        //serialize
        const review = dbPostData.get({ plain: true });
        res.render("edit-review", { review, loggedIn: true });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  module.exports = router;
  