import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

export const GenerateToken = (id, email) => {
    const token = jwt.sign(
        {id: id, email: email},
        process.env.JWT_SECRET,
        { expiresIn: "5h" }
    )

    return token
}