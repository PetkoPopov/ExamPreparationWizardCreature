const router =require('express').Router() 
const creatureServices = require('../services/creatureServices')

router.get("/create",(req,res)=>{
   
    res.render('posts/create') 
})
router.post('/create',async (req,res)=>{
const {name,eye,description,image,skin,species}=req.body
    console.log({ name, eye, description, image, skin, species });
  const creature = await creatureServices.create({ name, eye, description, image, skin, species })
    console.log(`\n creature Controller ${creature}`);
    res.render('posts/all-posts')
})
router.get("/edit", (req, res) => {

    res.render('posts/edit')
})
router.get("/details", (req, res) => {

    res.render('details')
})
router.get("*",(req,res)=>{
res.render('404')
})

module.exports = router