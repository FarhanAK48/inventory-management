const db = require('../db.config');
const Transactions = db.Transactions;

const createTranasction = (req,res)=>{
    const dataObj = {
        quantity:req.body.quantity,
        date: new Date(),
        product_id: req.body.product_id,
        sup_id:req.body.sup_id,
    }
    Transactions.create(dataObj).then((result)=>{
        res.status(201).send(result);
    }).catch((err)=>{
        res.status(500).send(err)
    })
}

const getAllTranasctions = (req,res)=>{   
    Transactions.findAll( {order : [['quantity', 'ASC']],   include: [
        { model: Products, as: 'product' },
        { model: Suppliers, as: 'supplier' }
      ]}).then((result)=>{
        res.status(201).send(result);
    }).catch((err)=>{
        res.status(500).send(err)
    })
}

const updateTranasction = (req,res)=>{
    const dataOb = {
        quantity:req.body.quantity,
        date: new Date(),
        product_id: req.body.product_id,
        sup_id:req.body.sup_id,
    }
    Transactions.update(dataOb, {where:{id:req.body.id}}).then((result)=>{
        if(result[0]=== 1){
            res.status(200).send({message:"Record updated successfully."});
        }
        else {
            res.status(404).send({ message: 'No record found with the provided ID', result });
        }
    }).catch((err)=>{
        res.status(500).send(err)
    })
}

const deleteTranasction = (req,res)=>{
 
    Transactions.destroy({where:{id:req.body.id}}).then((result)=>{
        if(result){
            res.status(200).send({message: "Record deleted successfully"});
        }
    }).catch((err)=>{
        res.status(500).send(err)
    })
}

module.exports = {
    createTranasction,
    getAllTranasctions,
    updateTranasction,
    deleteTranasction
}