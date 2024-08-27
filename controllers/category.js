const db = require('../db.config');
const Category = db.Category;

const createCategory  = (req, res)=>{
    const category = req.body.name;
    Category.create({name:category}).then((data)=>{
        res.status(201).send(data)
    }).catch((err)=>{
        console.log(err)
    })
}

const getCategories = (req, res) =>{
    Category.findAll().then((data)=>{
        res.status(200).send(data)
    }).catch((err)=>{
        res.status(500).send({message:"server error"})
    })
}

const updateCategory = (req, res) =>{
    const categoryData = {
        id: req.body.id,
        name: req.body.name,
       
      };
    Category.update(categoryData,{ where:{id:req.body.id}}).then((data)=>{
        if(data[0] === 1){
            res.status(200).send({message:"Category update successfully"})
        }else{
            res.status(504).send({message:" Some error"})
        }
        res.status(200).send(data)
    }).catch((err)=>{
        res.status(500).send({message:"server error"})
    })
}

const deleteCategory = (req,res)=>{
    Category.destroy({where:{ id: req.body.id}}).then((data)=>{
        if (data === 0) {
            return res.status(404).send("No record found with the provided ID");
        }
        res.send("Record deleted successfully");
    }).catch((err)=>{
        if (!res.headersSent) {
            res.status(500).send(err.message || "An error occurred while deleting the record");
        }
    })
}

module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
}