import express from "express"
import { create,getById,getALL,update,deleteTransaction } from "../controllers/transaction.controller.js"

const router = express.Router()
router.post('/create',create)
router.get('/getById/:id', getById)
router.get('/getALL',getALL)
router.put("/update/:id",update)
router.delete("/delete/:id",deleteTransaction)


export default router