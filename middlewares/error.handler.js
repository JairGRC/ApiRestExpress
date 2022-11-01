const { PrismaClient, Prisma } = require ('@prisma/client')


function logErrors(err,req,res,next){
  console.log('logErrors')
  console.error(err)
  next(err)
  /* res.status(500).json({
    status:err.statusCode || 500,
    message:err.message
  }) */
}

function errorHandler(err,req,res,next) {
  console.log('errorHandler')
  res.status(500).json({
    message:err.message,
    statck: err.stack
  })
}
function boomErrorHandler(err,req,res,next) {
  if(err.isBoom){
    const {output} = err;
    res.status(output.statusCode).json(output.payload)
  }
  next(err);
}

function ormErrorHandler(err, req, res, next) {
  console.log('ormERRO')
  console.log(err)
  if (err.message === "Validation error") {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors[0].message
    });
  }
  next(err);
}

function PrismaHandler(err,req,res,next){

  if(err instanceof Prisma.PrismaClientKnownRequestError){
    if(err.code ==='P2002'){
      res.status(409).json({
        statusCode: 409,
        message: `Hay una violación de restricción única, no se puede crear un nuevo usuario ${err.meta.target}`
      })
    }
  }
  next(err)
}

module.exports = {logErrors,errorHandler,boomErrorHandler, ormErrorHandler,PrismaHandler}
