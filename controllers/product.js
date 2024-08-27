const db = require('../db.config');
const Products = db.Products;

const addProduct = (req,res)=>{
    const productData = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        cat_id:req.body.cat_id
    }
    Products.create(productData).then((data)=>{
        res.status(201).send(data)
    }).catch((err)=>{
        res.status(500).send({message: err})
        console.log(err)
    })
}

const getProducts = (req,res)=>{
  
    Products.findAll().then((data)=>{
        res.status(200).send(data)
    }).catch((err)=>{
        res.status(500).send({message: err})
        console.log(err)
    })
}
const updateProduct = (req, res) =>{
    const productData = {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        cat_id:req.body.cat_id
       
      };
      Products.update(productData,{ where:{id:req.body.id}}).then((data)=>{
        if(data[0] === 1){
            res.status(200).send({message:"Products update successfully"})
        }else{
            res.status(504).send({message:" Some error"})
        }
        res.status(200).send(data)
    }).catch((err)=>{
        res.status(500).send({message:"server error"})
    })
}

const deleteProduct = (req,res)=>{
    Products.destroy({where:{ id: req.body.id}}).then((data)=>{
        if (data === 0) {
            return res.status(404).send("No record found with the provided ID");
        }else{
            res.send("Record deleted successfully");

        }
    }).catch((err)=>{
            res.status(500).send(err.message || "An error occurred while deleting the record");
    })
}

module.exports = {
    addProduct,
    getProducts,
    updateProduct,
    deleteProduct
}