const router = require("express").Router();
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");
const { User, Book, Review, Upvote } = require("../../models");

// get all books( with custom 'upvote count' added to attributes..)**
router.get("/", (req, res) => {
  Book.findAll({
    order: [["title", "ASC"]],
    attributes: [
      "id",
      "title",
      "author",
      "user_id",
      "created_at",
      [sequelize.literal("(SELECT COUNT(*) FROM upvote WHERE book.id = upvote.book_id)"), "upvote_count"]
    ],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Review,
        attributes: ["id", "review_text", "user_id", "book_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"]
        },
      }
    ]
  })
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//create a book
router.post("/", withAuth, (req, res) => {
  Book.create({
    title: req.body.title,
    user_id: req.session.user_id,
    author: req.body.author,
  })
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get ONE book by id ( with custom 'upvote count' added to attributes..)**
router.get("/:id", (req, res) => {
  Book.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "title",
      "author",
      "user_id",
      "created_at",
      [sequelize.literal("(SELECT COUNT(*) FROM upvote WHERE book.id = upvote.book_id)"), "upvote_count"]
    ],
    include: [
      {
        model: Review,
        attributes: ["id", "review_text", "user_id", "book_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"]
        }
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbData) => {
      if (!dbData) {
        res.status(404).json({ message: "No book found with this id" });
        return;
      }
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//edit book entry? may not be neeeded...
router.put("/:id", withAuth, (req, res) => {
  Book.update(
    {
      title: req.body.title,
    },
    {
      author: req.body.author,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbData) => {
      if (!dbData) {
        res.status(404).json({ message: "No bookfound with this id" });
        return;
      }
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// PUT /api/books/upvote** from javascript/book-votes.js
router.put("/upvote", withAuth,  (req, res) => {
  // ".upvote" is a custom static method created in models/Book.js
  Book.upvote({ ...req.body, user_id: req.session.user_id }, { Upvote, Review, User })
    .then((updatedVoteData) => res.json(updatedVoteData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//delete a book from the library.  ie, it was banned.
router.delete("/:id", withAuth, (req, res) => {
  Book.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbData) => {
      if (!dbData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
module.exports = router;
