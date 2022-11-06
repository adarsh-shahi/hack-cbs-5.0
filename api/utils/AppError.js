class AppError extends Error{
   constructor(statusCode, statusMessage){
      super(statusMessage)
      this.statusCode = statusCode
   }
}

export default AppError