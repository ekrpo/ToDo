const validateSchema = (schema) => (req,res,next)=>{
    const {error, obj} = schema.validate(req.body)
    if(error){
        console.log(error)
        return res.status(400).json({error:error.details[0].message})
    }
    next()
}

module.exports = validateSchema