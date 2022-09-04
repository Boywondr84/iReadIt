const router = require("express").Router();

const { User, Book, Review } = require("../../models");
// const withAuth = require("../../utils/auth");

// get all books
router.get("/", (req, res) => {
  Book.findAll({
    order: [["title", "ASC"]],
    attributes: ["id", "title", "user_id", "author", "created_at"],
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
          attributes: ["username"],
        },
      },
    ],
  })
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//create a book
router.post("/", (req, res) => {
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

//get ONE book by id
router.get("/:id", (req, res) => {
  Book.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "author", "user_id", "created_at"],
    include: [
      {
        model: Review,
        attributes: ["id", "review_text", "user_id", "book_id", "created_at"],
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
router.put("/:id", (req, res) => {
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

//delete a book from the library.  ie, it was banned.
router.delete("/:id", (req, res) => {
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
