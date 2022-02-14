const router = require('express').Router();
const { Books, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post("/", async (req, res) => {
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

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

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

router.get("/favorites", withAuth, async (req, res) => {

  try {
    const user = await User.findOne({
      where: {
        username: req.session.username,
      }
    });

    console.log(user);

    const userBooks = await user.getBooks();
    console.log(userbooks);

    res.status(200).json(userBooks);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", withAuth, async (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
module.exports = router;