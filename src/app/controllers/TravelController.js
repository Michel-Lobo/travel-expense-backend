const travelModel = require('../models/Travel')
module.exports ={
    async getAll(req, res){
       const {userId} = req.userId;
       try{
        const travel = await travelModel.find({userId: userId}).populate('user');
            
        return res.send({travel});
    }catch(err){
        return res.status(400).send({err})
    }
       
    },
    async getById(req, res){
        const {userId} = req.body;  
    },
    async create(req, res){
        const {description, budget} = req.body;
        try{
            const travel = await travelModel.create(
                {description: description,
                 budget: budget,
                 user: req.userId});
            return res.send({travel});
        }catch(err){
            return res.status(400).send({err})
        }
    },
    async delete(req, res){

    },
    async update(req, res){

    }
}