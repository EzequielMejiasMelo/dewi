const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('homepage');
});

router.get('/search', async (req, res) => {
    const tags = req.query.tagsearch ? req.query.tagsearch.split(',') : ["Fiction"];
    res.render('search', {tags});
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/shelf', (req, res) => {
    res.render('shelf');
});

module.exports = router;