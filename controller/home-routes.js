const router = require('express').Router();
const { Book, Review, User } = require('../models');

//get all books
router.get('/', (req, res) => {
    Book.findAll({
        attributes:[
            'id',
            'title',
            'user_id',
            'created_at'
        ],
        include:[
            {
            model: Review,
            attributes:['id', 'review_text', 'user_id', 'book_id'],
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

router.get('/', (req, res) => {
    Review.findAll({
        attributes: [
            "id", "review_text", "user_id", "book_id"
        ],
        include: [
            {
                model: Book,
                attributes: ['id', 'title'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(dbData => {
        const reviews = dbData.map(review => review.get({ plain: true }));

        res.render('homepage', {
            reviews,
            loggedIn: req.session.loggedIn
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;