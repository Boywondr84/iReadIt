const router = require('express').Router();
const { User } = require('../../models');

router.get('/', (req, res) => {
    User.findAll({
        attributes: {}
    })
        .then(dbUserData => {
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(dbUserData => {
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(400).json({ message: "User not found" });
                return;

                // add validate password logic here later

            } else {
                res.json(dbUserData);
            }
        });
});

router.post('/logout', (req, res) => {
    // session destroy logic
    res.status(204).end();

});

module.exports = router;