const router = require('express').Router();
const withAuth = require('../utils/auth');

//Renders the web pages for this project.

router.get('/', (req, res) => {
  res.render('homepage', { logged_in: req.session.logged_in });
});

router.get('/search', async (req, res) => {
  // Adds the tags found in the query.
  const tags = req.query.tagsearch
    ? req.query.tagsearch.split(',')
    : ['Fiction'];
  res.render('search', { tags, logged_in: req.session.logged_in });
});

router.get('/login', (req, res) => {
  res.render('login', { logged_in: req.session.logged_in });
});

router.get('/signup', (req, res) => {
  res.render('signup', { logged_in: req.session.logged_in });
});

router.get('/shelf', withAuth, (req, res) => {
  // Adds the username to the page.
  res.render('shelf', {
    logged_in: req.session.logged_in,
    username: req.session.username,
  });
});

module.exports = router;
