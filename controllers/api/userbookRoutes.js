const router = require('express').Router();

router.put("/:id", (req, res) => {
    res.json(`This will update the book of id ${req.params.id} of wether it was read or not.`);
});

router.post("/:id", (req, res) => {
    res.json(`This will put the book of id ${req.params.id} into the user's favorites.`);
});

router.delete("/:id", (req, res) => {
    res.json(`This will remove the book of id ${req.params.id} from the user's favorites.`);
});
module.exports = router;