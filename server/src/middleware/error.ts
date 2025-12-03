class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.success = false; 
        this.error = true;    
    }
}

module.exports = CustomError;