const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    res.render('homepage', {logged_in: req.session.logged_in});
});

router.get('/search', async (req, res) => {
    const tags = req.query.tagsearch ? req.query.tagsearch.split(',') : ["Fiction"];
    res.render('search', {tags, logged_in: req.session.logged_in});
});

router.get('/login', (req, res) => {
    res.render('login', {logged_in: req.session.logged_in});
});

router.get('/signup', (req, res) => {
    res.render('signup', {logged_in: req.session.logged_in});
});

router.get('/shelf', withAuth, (req, res) => {
    res.render('shelf', {logged_in: req.session.logged_in, username: req.session.username});
});

module.exports = router;