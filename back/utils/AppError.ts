class AppError extends Error {
 constructor( message: string,public status: number,public isOperational:boolean=true) {
    super(message);
    }
}


export default AppError