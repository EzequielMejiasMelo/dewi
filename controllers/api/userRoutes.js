const router = require('express').Router();
const { Books, User, UserBooks, Author, AuthorBooks } = require('../../models');
const withAuth = require('../../utils/auth');

// Signs up a new user.
router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.username = userData.username;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Check for the username and verifies password. If good, logs the in with session storage.
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }
    console.log(req.body);
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }
    console.log(userData.username);
    req.session.save(() => {
      req.session.username = userData.username;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get's the users favorite books.
router.get('/favorites', withAuth, async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.session.username,
      },
      include: [
        {
          model: Books,
          include: [{ model: Author, through: AuthorBooks, as: 'my_authors' }],
          through: UserBooks,
          as: 'books_user',
        },
      ],
    });
    console.log(user);

    res.status(200).json({ books: user.books_user });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Logs the user out by removing the session data.
router.post('/logout', withAuth, async (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
module.exports = router;
