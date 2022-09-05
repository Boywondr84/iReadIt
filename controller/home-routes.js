const router = require("express").Router();
const { Book, Review, User } = require("../models");

//get all books
router.get('/', (req, res) => {
    Book.findAll({
        attributes: [
            'id',
            'title',
            'user_id',
            'created_at'
        ],
        include:[
            {
            model: Review,
            attributes:['id', 'review_text', 'user_id', 'book_id', 'created_at'],
            include:{
                model:User,
                attrubutes:['username']
            }
            },
            {
                model:User,
                attributes:['username']
            }
        ]
    })
    .then(dbBookData => {
        const books = dbBookData.map(book => book.get({plain: true}));
        res.render('homepage', {books})
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    });
});
router.get('/book/:id', (req,res) => {
    Book.findOne({
        where:{
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'user_id',
            'created_at'
        ],
        include:[
            {
            model: Review,
            attributes:['id', 'review_text', 'user_id', 'book_id', 'created_at'],
            include:{
                model:User,
                attrubutes:['username']
            }
            },
            {
                model:User,
                attributes:['username']
            }
        ]
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//singlebook page render
router.get("/book/:id", (req, res) => {
  Book.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "user_id", "created_at"],
    include: [
      {
        model: Review,
        attributes: ["id", "review_text", "user_id", "book_id"],
        include: {
          model: User,
          attrubutes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbBookData) => {
      if (!dbBookData) {
        res.status(404).json({ message: "No book found with this id." });
        return;
      }
      const book = dbBookData.get({ plain: true });

      res.render("single-book", { book, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  // if (req.session.loggedIn) {
  //     res.redirect('/');
  //     return;
  // }
  res.render("login");
});

module.exports = router;
