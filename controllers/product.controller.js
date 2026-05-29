import {prisma} from "../lib/prisma.js"
import { existsSync, unlinkSync } from "fs"
import { title } from "process";

const removeFilesFromStatic = async (filename) => {
    existsSync(`./uploads/${filename}`) && unlinkSync(`./uploads/${filename}`);
}

export const create = async (req,res) => {
    const filename = req.file.filename
    const body = req.body

    await prisma.product.create({
        data : {
            name : body.name,
            type : body.type,
            price : body.price,
            image : filename

        }
    })

    return res.json ({
        message : "product added successfully"
    })

}

export const getById = async (req,res) => {
    const id = req.params.id
    const product = await prisma.product.findUnique({
        where : {
            id : Number(id)
        },
        include: {
            payment: true
        }
    })
     return res.json(product)
}

export const getALL =  async (req,res) => {
    const product = await prisma.product.findMany({
        include: {
            payment: true
        }
    })

     return res.json(product)
}

export const update = async (req, res) => {
    const body = req.body

    const oldImage = await prisma.product.findUnique({
        where: {
            id: Number(req.params.id)
        },
        select: {
            image: true
        }
    })

    let data = {
        name : body.name,
        type : body.type,
        price : body.price
    }

    if (req.file) {
        data = {
            ...data,
            image: req.file.filename
        }
    }

    const updateData = await prisma.product.update({
        where: {
            id: Number(req.params.id)
        },
        data
    })

    if (req.file && updateData) {
      await removeFilesFromStatic(oldImage.image)
    }

    res.json ({
        message: 'Product has been updated'
    })
}

export const deleteProduct = async (req, res) => {
    const id = Number(req.params.id)

    await prisma.product.delete({
        where: {
            id: id
        }
    })

    return res.json({
        message:'Data has been deleted'
    })
}