import dotenv from "dotenv";
import { TeamleadApproval } from '../../Models/TeamleadApproval.js'
import { HandleApprovalRequest } from "../../Utility/HandleRequestApproval.js";

dotenv.config()

export const RequestApprovalTeamlead = async (req, res) => {
    const { email, managerEmail } = req.body
    return HandleApprovalRequest(TeamleadApproval, email, managerEmail, res, "manager")
}