const db = require('../db.config');
const Suppliers = db.Suppliers;



const createSupplier  = (req, res)=>{
    const supplier ={
        name:req.body.name,
        contact_name: req.body.contact_name,
        contact_email: req.body.contact_email,
    };
    Suppliers.create(supplier).then((data)=>{
        res.status(201).send(data)
    }).catch((err)=>{
        console.log(err)
    })
}

const getSuppliers = (req, res) =>{
    Suppliers.findAll().then((data)=>{
        res.status(200).send(data)
    }).catch((err)=>{
        res.status(500).send({message:"server error"})
    })
}

const updateSupplier = (req, res) =>{
    const categoryData = {
        id: req.body.id,
        name: req.body.name,
        contact_name: req.body.contact_name,
        contact_email: req.body.contact_email,
       
      };
    Suppliers.update(categoryData,{ where:{id:req.body.id}}).then((data)=>{
        if(data[0] === 1){
            res.status(200).send({message:"Suppliers update successfully"})
        }else{
            res.status(504).send({message:" Some error"})
        }
        res.status(200).send(data)
    }).catch((err)=>{
        res.status(500).send({message:"server error"})
    })
}

const deleteSupplier = (req,res)=>{
    Suppliers.destroy({where:{ id: req.body.id}}).then((data)=>{
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
    createSupplier,
    getSuppliers,
    updateSupplier,
    deleteSupplier
}