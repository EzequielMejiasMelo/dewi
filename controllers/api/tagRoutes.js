const req = require('express/lib/request');
const { Author, Books, Tags, AuthorBooks, TagBooks } = require('../../models');
const {Op} = require('sequelize');
const router = require('express').Router();

router.get("/", async (req, res) => {
    try{
        const tags = await Tags.findAll({order: ['id']});
        res.json(tags);
    } catch(err){
        res.status(400).json('Cannot return data.')
        console.log(err);
    }
});

router.post("/searchbooks", async (req, res) => {
    // should have the queries limit and pagenum.
    try{
    //console.log(req.body.tags);
    const limit= req.query.limit ? parseInt(req.query.limit) : 10;
    const pagenum= req.query.pagenum ? (limit*(parseInt(req.query.pagenum)-1))+1 : 1;
    console.log(req.body);
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
    for(let i = pagenum-1; i < pagenum + limit-1 && i < searchResults.length; i++){
        output.push(await Books.findByPk(searchResults[i].id, {
            include: [{ model: Tags, through: {model: TagBooks, attributes:[]}, as: 'book_tags'}]
        }));
    }
    res.json({books: output, totalcount: searchResults.length, pagestart: pagenum});
    }catch(err){
        res.status(400).json('Cannot parse data.')
        console.log(err);
    }
});

router.get("/autocomp/:searchtext", async (req, res) => {
    try{
        const tags = await Tags.findAll({
            where: {
                name: {
                    [Op.substring]: req.params.searchtext
                }
            },
            limit: 10,
            order: ['id']
        });
        res.json(tags);
    } catch(err){
        res.status(400).json('Cannot return data.')
        console.log(err);
    }
});



module.exports = router;