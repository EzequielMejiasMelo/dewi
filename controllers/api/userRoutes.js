const router = require('express').Router();

router.post("/", (req, res) => {
    try {
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

router.post("/login", (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });
    
        if (!userData) {
          res
            .status(400)
            .json({ message: 'Incorrect username or password, please try again' });
          return;
        }
    
        const validPassword = await userData.checkPassword(req.body.password);
    
        if (!validPassword) {
          res
            .status(400)
            .json({ message: 'Incorrect username or password, please try again' });
          return;
        }
    
        req.session.save(() => {
          req.session.username = userData.username;
          req.session.logged_in = true;
          
          res.json({ user: userData, message: 'You are now logged in!' });
        });
    
      } catch (err) {
        res.status(400).json(err);
      }
});

router.get("/", (req, res) => {
    res.json(`This will return the login'd users favorite books.`);
});


module.exports = router;