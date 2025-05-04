import dotenv from "dotenv";
import { ManagerApproval } from "../../Models/ManagerApproval.js";

dotenv.config()

export const RequestApproval = async (req, res) => {
    const { email } = req.body
    try {
        const request = await ManagerApproval.findOne({ where: { email: email } })
        if (request) {
            if (request.status === 'pending' || request.status === 'process') {
                return res.status(200).json({ message: `Approval status for email - ${email} is '${request.status}'. Please wait for the root user to approve your request.` })
            }
            return res.status(200).json({ message: `Request token expired, your request is already approved, create account.` })
        }
        const newRequest = await ManagerApproval.create({
            email: email
        })

        return res.status(201).json({ 
            message: `Requested for approval. Please wait for the root user to approve your email - ${newRequest.email}.`
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ERROR: error })
    }
}