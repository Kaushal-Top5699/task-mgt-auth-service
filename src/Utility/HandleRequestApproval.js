// utils/requestApprovalHandler.js
export const HandleApprovalRequest = async (Model, email, headEmail = null, res, approverRole = "admin") => {
    console.log(approverRole)
    try {
        const request = await Model.findOne({ where: { email } });

        if (request) {
            if (request.status === 'pending' || request.status === 'process') {
                return res.status(200).json({
                    message: `Approval status for email - ${email} is '${request.status}'. Please wait for the ${approverRole} to approve your request.`
                });
            }

            return res.status(200).json({
                message: `Request token expired or already approved. Please proceed with account creation.`
            });
        }

        if (approverRole === 'admin') {
            const newRequest = await Model.create({ email });
            return res.status(201).json({
                message: `Approval requested. Please wait for the ${approverRole} to approve your email - ${newRequest.email}.`
            });
        } else if (approverRole === 'manager') {
            const newRequest = await Model.create({ email: email, managerEmail: headEmail });
            return res.status(201).json({
                message: `Approval requested. Please wait for the ${approverRole} to approve your email - ${newRequest.email}.`
            });
        } 
        
        const newRequest = await Model.create({ email: email, managerEmail: headEmail });
        return res.status(201).json({
            message: `Approval requested. Please wait for the ${approverRole} to approve your email - ${newRequest.email}.`
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ERROR: error.message });
    }
};
