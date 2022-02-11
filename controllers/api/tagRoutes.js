const req = require('express/lib/request');

const router = require('express').Router();

router.get("/", (req, res) => {
    res.json("Here will be the list of all tags.");
});

router.get("/searchbooks", (req, res) => {
    // should have the queries limit and pagenum.
    res.json(`Here will be the search results, but only ${req.query.limit} of them, and page ${req.query.pagenum}`);
});

router.get("/autocomp/:searchtext", (req, res) => {
    res.json(`Here will be the list of tags based on the partial sent by param. Currently ${req.params.searchtext}`);
});



module.exports = router;