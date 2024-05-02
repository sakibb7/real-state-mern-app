import express from "express"

const router = express.Router()

router.get("/test", (req,res)=> {
    console.log(" Test Router is working");
})


export default router