const router = require('express').Router();
const { Book, Review, User } = require('../models');

router.get('/', (req, res) => {
    Book.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id', 'title', 'user_id', 'created_at'
        ],
        include: [
            {
                model: Review,
                attributes: ['id', 'review_text', 'user_id', 'book_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbData => {
        const books = dbData.map(post => post.get({ plain: true }));
        res.render('dashboard', { books, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;