// class ApiResponse{
//     constructor(
//         statuscode,
//         data,
//         message = "SUCCESS"
//     ){
//         this.statuscode = statuscode;
//         this.data = data;
//         this.message = message;
//         this.success = statuscode<400
//     }
// }

// export default ApiResponse

class ApiResponse<T = any> {
    public statuscode: number;
    public data: T;
    public message: string;
    public success: boolean;

    constructor(
        statuscode: number,
        data: T,
        message: string = "SUCCESS"
    ) {
        this.statuscode = statuscode;
        this.data = data;
        this.message = message;
        this.success = statuscode < 400;
    }
}

export default ApiResponse;