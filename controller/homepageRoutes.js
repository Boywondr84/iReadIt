const router = require('express').Router();
const { Book, Review, User } = require('../models');


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