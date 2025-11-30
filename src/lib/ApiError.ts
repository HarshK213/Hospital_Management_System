// class ApiError extends Error{
//     constructor(
//         statuscode,
//         message = "Something went wrong",
//         errors = [],
//         stack = ""
//     ){
//         super(message);
//         this.errors = errors;
//         this.statuscode = statuscode;
//         this.message = message;
//         this.data = null;
//         this.success = false;

//         if(stack){
//             this.stack = stack;
//         }else{
//             Error.captureStackTrace(this, this,constructor);
//         }
//     }
// }

// export default ApiError;

class ApiError extends Error {
    constructor(
        public readonly statuscode: number,
        message: string = "Something went wrong",
        public readonly errors: any[] = [],
        stack: string = ""
    ) {
        super(message);
        
        // Set the prototype explicitly for proper instanceof checks
        Object.setPrototypeOf(this, ApiError.prototype);
        
        this.name = 'ApiError';
        this.data = null;
        this.success = false;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    public readonly data: null = null;
    public readonly success: boolean = false;
}

export default ApiError;