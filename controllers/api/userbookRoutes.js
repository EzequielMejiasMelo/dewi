const Books = require('../../models/Books');
const User = require('../../models/User');
const UserBooks = require('../../models/UserBooks');
const withAuth = require('../../utils/auth');

const router = require('express').Router();

router.post("/:id", async (req, res) => {
    //This will put the book of id ${req.params.id} into the user's favorites.
    try {
        if (!req.session.username) {
            res.status(401).json("Not Logged in");
            return;
        }
        const book = await Books.findOne({
            where: {
                id: req.params.id,
            }
        });

        const user = await User.findOne({
            where: {
                username: req.session.username,
            }
        });

        const isFavorite = await UserBooks.findOne({
            where: {
                book_id: book.id,
                user_id: user.id
            }
        });
        if(!isFavorite){
            await UserBooks.create({
                book_id: book.id,
                user_id: user.id
            });
            
        }

        res.status(200).json({ addedBook: book, message: 'Book has been added.' });
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

        const user = await User.findOne({
            where: {
                username: req.session.username,
            }
        });

        await UserBooks.destroy({
            where: {
                book_id: book.id,
                user_id: user.id
            }
        });
        res.status(200).json({ removedBook: book, message: 'Book has been removed.' });
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;