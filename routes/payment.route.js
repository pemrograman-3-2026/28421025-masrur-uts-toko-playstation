import express from "express"
import { create,getById,getALL,update,destroy } from "../controllers/payment.controller.js"

const router = express.Router()
router.post('/create',create)
router.post('/getById', getById)
router.post('/getALL',getALL)
router.post("/update",update)
router.post("/delete",destroy)


export default router