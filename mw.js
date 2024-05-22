const errorHandlingMW = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace for debugging
  
    // Set response status code and message
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: process.env.NODE_ENV === 'development' ? err : {} // Show full error in development
    });
  };

  export default errorHandlingMW;