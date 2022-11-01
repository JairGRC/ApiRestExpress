const HapiBoom = require('@hapi/boom');
const { config } = require('./../configsss/configss');

function checkAdminRole(req,res,next) {
    const user = req.user
    if(user.role ==='admin'){
      next()
    }else{
      next(HapiBoom.unauthorized())
    }
}
function checkRoles(...roles) {
  return (req,res,next)=>{
    const user = req.user
    if(roles.includes(user,role)){
      next()
    }else{
      next(HapiBoom.unauthorized())
    }
  }
}

module.exports =  {checkAdminRole,checkRoles}
