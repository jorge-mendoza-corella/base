function logErrors(err, req, res, next) {
  console.error(err + errorFunctionName(err));
  next(err); // el siguiente actualmente es: errorBoom
}

function errorBoom(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  else {
    next(err); // el siguiente actualmente es: errorDBHandler
  }
}

function errorDBHandler(err,req, res,next) {
  console.error("AY WEYYYYYY ALGO SUCEDIO EN LA BD.......");
  next(err); // el siguiente actualmente es: errorHandler
}

function errorHandler(err,req, res,next) {
  res.status(500).json({
    message: err.message
  });
}


function errorFunctionName(error) {
  const stackTrace = error.stack;
  const functionNameRegex = /at\s+(.*)\s+\(/;
  const functionNameRegex2 = /([\w\d_.-]+\.js):(\d+):(\d+)/;

  try {
    const archivoErr = functionNameRegex2.exec(stackTrace)[1];
    const funcionErr = functionNameRegex.exec(stackTrace)[1];
    const lineaErr = functionNameRegex2.exec(stackTrace)[2];
    // si es un error que se puede formatear con las regex anteriores
    return " en archivo: " + archivoErr + " funcion: " + funcionErr + " linea: " + lineaErr;
  } catch (error) {
    return '';
  }

}


module.exports = { logErrors, errorHandler, errorBoom, errorDBHandler }
