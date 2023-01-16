const router = require("express").Router(); //setting a router
const mustDoItemsModel = require('../models/mustDoItems') //importing list of must dos


//route to add data to router
router.post('/api/item', async (req, res)=>{
    try{
        const newItem = new mustDoItemsModel({
            item: req.body.item
        })
        const saveItem = await newItem.save()//saving items to router
        res.status(200).json(saveItem);
    }catch(err){
        res.json(err);
    }
})

//route to get data from router

router.get('/api/items', async (req, res)=>{
    try{
        const allMustDoItems = await mustDoItemsModel.find({});
        res.status(200).json(allMustDoItems) //return all items in json format
    }catch(err){
        res.json(err);
    }
})

//route to update data to router
router.put('/api/item/:id', async (req, res)=>{
    try{
        const updateItem = await mustDoItemsModel.findByIdAndUpdate(req.params.id, {$set: req.body});
        res.status(200).json('Item has been updated');
    }catch(err){
        res.json(err);
    }
})


//route to delete items
router.delete('/api/item/:id', async (req, res)=>{
    try{
      //find the item by its id and delete it
      const deleteItem = await mustDoItemsModel.findByIdAndDelete(req.params.id);
      res.status(200).json('Item has been deleted');
    }catch(err){
      res.json(err);
    }
  })

//exporting to router
module.exports = router;