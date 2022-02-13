const req = require('express/lib/request');
const { Author, Books, Tags, AuthorBooks, TagBooks } = require('../../models');
const router = require('express').Router();

router.get("/", (req, res) => {
    res.json("Here will be the list of all tags.");
});

router.get("/searchbooks", async (req, res) => {
    // should have the queries limit and pagenum.
    try{
    //console.log(req.body.tags);
    const limit= req.query.limit ? parseInt(req.query.limit) : 10;
    const pagenum= req.query.pagenum ? (limit*(parseInt(req.query.pagenum)-1))+1 : 1;
    const tagsRaw = await Tags.findAll({where: {name: req.body.tags}});
    const tags = tagsRaw.map(element => element.id);
    let searchResults = await Books.findAll({
        include: [{ model: Tags, through: {model: TagBooks, attributes:[]},where: {
            id: tags
        }, as: 'book_tags' }],
        order: [['rating', 'DESC']],
        attributes: ['id']
    });

    searchResults = searchResults.filter(element =>{return element.book_tags.length >= tags.length});
    let output = [];
    for(let i = pagenum-1; i < pagenum + limit-1 || i >= searchResults.length; i++){
        output.push(await Books.findByPk(searchResults[i].id, {
            include: [{ model: Tags, through: {model: TagBooks, attributes:[]}, as: 'book_tags'}]
        }));
    }
    res.json(output);
    }catch(err){
        res.status(400).json('Cannot parse data.')
        console.log(err);
    }
});

router.get("/autocomp/:searchtext", (req, res) => {
    res.json(`Here will be the list of tags based on the partial sent by param. Currently ${req.params.searchtext}`);
});



module.exports = router;