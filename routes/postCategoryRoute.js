const router = require('express').Router();
const PostCategory = require('../model/postcategory')
const verify=require('../middleware/verifyToken')

router.post('/addCategory',verify,async (req, res) => {

    const postcategory=new PostCategory({
        name:req.body.name,
        description:req.body.description,
    })

    // existing category validation
    const categoryExist = await PostCategory.findOne({
        name:req.body.name,
    })
    if(categoryExist)return res.status(400).send('Category is Exist!')

    try{
        const saveCategory=await postcategory.save()
        res.status(200).send(saveCategory)
    }catch (e) {
        console.log(e)
        res.status(400).send(e)
    }


})

router.get('/getCategories', verify,async (req, res) => {
    try {
        const posts = await PostCategory.find()
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;