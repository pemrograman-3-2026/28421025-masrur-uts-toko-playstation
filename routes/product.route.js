import express from "express"
import { create,getById,getALL,update,deleteProduct } from "../controllers/product.controller.js"
import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + ext)
  }
})

const upload = multer({ storage: storage })

const router = express.Router()
router.post('/create', upload.single('image'), create)
router.get('/getById/:id', getById)
router.get('/getALL',getALL)
router.put("/update/:id", upload.single('image'), update)
router.delete("/delete/:id", deleteProduct)


export default router