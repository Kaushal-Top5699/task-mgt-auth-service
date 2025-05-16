import dotenv from "dotenv";
import { ManagerApproval } from "../../Models/ManagerApproval.js";
import { HandleApprovalRequest } from "../../Utility/HandleRequestApproval.js";

dotenv.config()

export const RequestApproval = async (req, res) => {
    const { email } = req.body
        return HandleApprovalRequest(ManagerApproval, email, null, res, "admin")
}