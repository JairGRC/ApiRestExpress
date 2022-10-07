const HapiBoom = require('@hapi/boom');
// Validaciones para los modelos de manera dinamica en todos los tipos de solicitud Get-Post-Put-delete
function validatorHandler(schema,property) {
  return (req,res,next)=>{
    const data= req[property];
    const {error} = schema.validate(data,{abortEarly:false});
    if(error){
      next(HapiBoom.badRequest(error))
    }
    next()
  }
}
module.exports = validatorHandler
