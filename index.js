import express from 'express'
import bodyParser from 'body-parser'
import cors from "cors";
import { sequelize } from './src/DB/db.js';
import { SignUp } from './src/Routes/RootUser/SignUp.js';
import { SignIn } from './src/Routes/RootUser/SignIn.js';
import { RequestApproval } from './src/Routes/Manager/RequestApproval.js';
import { RequestApprovalTeamlead } from './src/Routes/Teamlead/RequestApproval.js';
import { SendApproveToken } from './src/Routes/RootUser/SendApproveToken.js';
import { SignUpManager } from './src/Routes/Manager/SignUp.js';
import { SignInManager } from './src/Routes/Manager/SignIn.js';
import { ManagerSendApproveToken } from './src/Routes/Manager/SendApproveToken.js';
import { SignUpTeamlead } from './src/Routes/Teamlead/SignUp.js';
import { SignInTeamlead } from './src/Routes/Teamlead/SignIn.js';
import { RequestApprovalEmployee } from './src/Routes/Employee/RequestApproval.js';
import { TeamleadSendApproveToken } from './src/Routes/Teamlead/SendApproveToken.js';

const app = express()
const PORT = 3000

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

async function dbConnectionTest() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('✅Database connection has been established successfully.')
    } catch (error) {
        console.log(`ERROR: ${error}`)
    }
}

dbConnectionTest()

app.post('/root/create-root', SignUp)
app.post('/root/signin', SignIn)
app.post('/root/send-token', SendApproveToken)

app.post('/manager/approval-request', RequestApproval)
app.post('/manager/create-manager', SignUpManager)
app.post('/manager/signin', SignInManager)
app.post('/manager/send-token', ManagerSendApproveToken)

app.post('/teamlead/approval-request', RequestApprovalTeamlead)
app.post('/teamlead/create-teamlead', SignUpTeamlead)
app.post('/teamlead/signin', SignInTeamlead)
app.post('/teamlead/send-token', TeamleadSendApproveToken)

app.post('/employee/approval-request', RequestApprovalEmployee)


app.listen(PORT, '0.0.0.0', () => {
    console.log(`Auth Service active on PORT: ${PORT}`)
})