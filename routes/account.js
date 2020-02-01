const
    express     = require('express'),
    router      = express.Router(),
    User        = require('../models/user'),
    passport    = require('passport'),
    jwt         = require('jsonwebtoken'),
    config      = require('../config/db');

// router.get('/reg', (req, res) => res.send('Registration page'));
router.post('/reg', (req, res) => {
    // res.send('Registration page')
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        login: req.body.login,
        password: req.body.password
    });
    User.addUser(newUser, (err, user) => {
        err
            ? res.json({success: false, msg: 'User is not added'})
            : res.json({success: true, msg: 'User is added'});
    })

});
router.post('/login', (req, res) => {
    const login = req.body.login;
    const password = req.body.password;
    User.getUserByLogin(login, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({success: false, msg: 'User not found!'});
        User.comparePass(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {expiresIn: 3600 * 24});
                res.json({
                    success: true,
                    token: 'JWT' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        login: user.login,
                        email: user.email,
                    }
                })
            } else return res.json({success: false, msg: 'Password is not correct'});

        });
    })
});
router.get(
    '/dashboard',
    passport.authenticate('jwt', {session: false}),
    (req, res) => res.send('Dashboard page')
);

module.exports = router;