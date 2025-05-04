import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config()

export const HashPassword = async (password) => {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_VAL))
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
}