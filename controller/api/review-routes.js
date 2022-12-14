const router = require("express").Router();

const { User, Book, Review } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
  Review.findAll({
    attributes: ["id", "review_text", "user_id", "book_id", "created_at"],
    include: [
      {
        model: Book,
        attributes: ["title", "author"],
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get ONE review
router.get("/:id", (req, res) => {
  Review.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "review_text", "user_id", "book_id", "created_at"],
    include: [
      {
        model: Book,
        attributes: ["title", "author"],
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbData) => {
      if (!dbData) {
        res.status(404).json({ message: "No review found with this id" });
        return;
      }
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//create new review..
router.post("/", withAuth, (req, res) => {
  //check session
  // if (req.session) {
  Review.create({
    review_text: req.body.review_text,
    //use user_id from the session..??
    user_id: req.session.user_id,
    book_id: req.body.book_id,
  })
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
  // }
});

//edit your review text with .put
router.put("/:id", withAuth, (req, res) => {
  Review.update(
    {
      review_text: req.body.review_text,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbData) => {
      if (!dbData) {
        res.status(404).json({ message: "no review exists with this id" });
        return;
      }
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

//delete review
router.delete("/:id", withAuth, (req, res) => {
  console.log(req.body);
  Review.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbData) => {
      if (!dbData) {
        res.status(404).json({ message: "no review with that id found!" });
        return;
      }
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;
