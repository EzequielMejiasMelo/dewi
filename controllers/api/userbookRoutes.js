const Books = require('../../models/Books');
const User = require('../../models/User');
const withAuth = require('../../utils/auth');

const router = require('express').Router();

router.put("/:id", withAuth, (req, res) => {
    //This will update the book of id ${req.params.id} of whether it was read or not.
});

router.post("/:id", withAuth, async (req, res) => {
    //This will put the book of id ${req.params.id} into the user's favorites.
    try {
        const book = await Books.findOne({
            where: {
                id: req.params.id,
            }
        });

        await User.findOne({
            where: {
                username: req.session.username,
            }
        }).addBook(book);

        res.status(200).json({addedBook: book, message: 'Book has been added.' });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete("/:id", withAuth, async (req, res) => {
    //This will remove the book of id ${req.params.id} from the user's favorites.
    try {
        const book = await Books.findOne({
            where: {
                id: req.params.id,
            }
        });

        await User.findOne({
            where: {
                username: req.session.username,
            }
        }).removeBook(book);

        res.status(200).json({removedBook: book, message: 'Book has been removed.'});
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;