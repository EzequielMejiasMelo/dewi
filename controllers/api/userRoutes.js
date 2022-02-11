const router = require('express').Router();

router.post("/", (req, res) => {
    res.json(`This will create the user login.`);
});

router.post("/login", (req, res) => {
    res.json(`This will log the user in, and add a session cookie.`);
});

router.get("/", (req, res) => {
    res.json(`This will return the login'd users favorite books.`);
});


module.exports = router;