import jwt from "jsonwebtoken"

// const isAuthenticated = async (req, res, next) => {
//     try {
//         const token = req.cookies.token;
//         if (!token) {
//             return res.status(401).json({
//                 message: "user not authenticated"
//             })
//         }
//         //varify token
//         const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY)
//         console.log(decode);

//         if (!decode) {
//             return res.status(401).json({
//                 message: "Invalid token"
//             })
//         }
//         req.id = decode.userId
//         next()
//     } catch (error) {
//         console.log(error);
//     }
// }

// export default isAuthenticated


const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decode) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return res.status(401).json({ message: "Session expired, please log in again" });
                }
                return res.status(401).json({ message: "Invalid token" });
            }
            req.id = decode.userId;
            next();
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
export default isAuthenticated