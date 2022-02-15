const req = require('express/lib/request');
const { Author, Books, Tags, AuthorBooks, TagBooks } = require('../../models');
const { Op } = require('sequelize');
const router = require('express').Router();

// Returns all tag data.
router.get('/', async (req, res) => {
  try {
    const tags = await Tags.findAll({ order: ['id'] });
    res.json(tags);
  } catch (err) {
    res.status(400).json('Cannot return data.');
    console.log(err);
  }
});

// Finds books with the tags included in the body.
router.post('/searchbooks', async (req, res) => {
  try {
    // Sets up the parameters, wether there or not.
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const pagenum = req.query.pagenum
      ? limit * (parseInt(req.query.pagenum) - 1) + 1
      : 1;
    // Finds the tag information and sorts it to ID.
    const tagsRaw = await Tags.findAll({ where: { name: req.body.tags } });
    const tags = tagsRaw.map((element) => element.id);
    
    // Gets books with the tags.
    let searchResults = await Books.findAll({
      include: [
        {
          model: Tags,
          through: { model: TagBooks, attributes: [] },
          where: {
            id: tags,
          },
          as: 'book_tags',
        },
      ],
      order: [['rating', 'DESC']],
      attributes: ['id'],
    });

    // Filters out all books that do not have all the tags.
    searchResults = searchResults.filter((element) => {
      return element.book_tags.length >= tags.length;
    });
    
    // On the page number, at the page size,
    // The books are reaquire with all there author and tag information.
    let output = [];
    for (
      let i = pagenum - 1;
      i < pagenum + limit - 1 && i < searchResults.length;
      i++
    ) {
      output.push(
        await Books.findByPk(searchResults[i].id, {
          include: [
            {
              model: Tags,
              through: { model: TagBooks, attributes: [] },
              as: 'book_tags',
            },
            {
              model: Author,
              through: { model: AuthorBooks, attributes: [] },
              as: 'my_authors',
            },
          ],
        })
      );
    }
    // The book data, along with the page information is sent out.
    res.json({
      books: output,
      totalcount: searchResults.length,
      pagestart: pagenum,
    });
  } catch (err) {
    res.status(400).json('Cannot parse data.');
    console.log(err);
  }
});

// Sends tags results for an autocomplete.
router.get('/autocomp/:searchtext', async (req, res) => {
  try {
    const tags = await Tags.findAll({
      where: {
        name: {
          [Op.substring]: req.params.searchtext,
        },
      },
      limit: 10,
      order: ['id'],
    });
    res.json(tags);
  } catch (err) {
    res.status(400).json('Cannot return data.');
    console.log(err);
  }
});

module.exports = router;
