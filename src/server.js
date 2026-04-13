import "dotenv/config"
import express from "express";
import projectRoutes from "./modules/project/projectRoutes.js"
import issuesRoutes from "./modules/issues/issuesRoutes.js"
import authRoutes from "./auth/authRoutes.js"
import { connectDB, disconnectDB } from "./db/client.js";

connectDB();

const app = express()
const PORT = 5005

app.use(express.json())
app.use("/project", projectRoutes)
app.use("/issue", issuesRoutes)
app.use("/auth", authRoutes)

const server = app.listen(PORT, ()=> {
    console.log(`SERVER IS LIVE AT ${PORT}`); 
})


process.on("unhandledRejection", (err) =>{
    console.error("UnhandledRejection", err);
    server.close(async () =>{
        await disconnectDB()
        process.exit(1);
    })
})
process.on("uncaughtException", async (err) =>{
    console.error("UnhandledRejection", err);
    await disconnectDB()
    process.exit(1);
})

process.on("SIGTERM", async(err)=>{
    console.log(`SIGTREM received, hutting Down Server Gracefully`);
    server.close(async () =>{
        await disconnectDB()
        process.exit(0);
    })
    
})