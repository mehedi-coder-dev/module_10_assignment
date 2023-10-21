const WorksModel = require('../Models/WorksModel')
//create works
exports.createWorks = async(req,res)=>{
     const bodydata = req.body
     bodydata.email = req.headers["email"]
     try{
      const data =  await WorksModel.create(bodydata)
       res.status(200).json({status:'success',data:data})
        
     }catch(error){
        res.status(401).json({status:'fail',data:"works not create"})
     }
}
//read works
exports.readWorks = async(req,res)=>{
     const id = req.params.id

     try{
       const result  = await WorksModel.find({_id:id})
        res.status(200).json({status:"success",data:result})
     }catch(error){
        res.status(401).json({status:"fail",data:"works user not found"})
     }
}
//update works
exports.updateWorks = async(req,res)=>{
  const id = req.params.id
  const status = req.params.status
  const query = {_id:id}
  const updateData = {status:status}

  try{
  const result =  await WorksModel.updateOne(query,updateData)
   res.status(401).json({status:'success',data:result})
  }catch(error){
    res.status(401).json({status:'fail',data:"works not found!"})
  }

  
}
//delete works
exports.deleteWorks = async(req,res)=>{
  const id = req.params.id
 try{
   const result =  await WorksModel.deleteOne({_id:id})
    res.status(200).json({status:'success',data:result})

 }catch(error){
    res.status(401).json({status:'fail',data:"works item not found!"})
 }
}