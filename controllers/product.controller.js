import {prisma} from "../lib/prisma.js"

export const create = async (req,res) => {
    const body = req.body

    await prisma.product.create({
        data : {
            name : body.name,
            type : body.type,
            price : body.price

        }
    })

    return res.json ({
        message : "product added successfully"
    })

}

export const getById = async (req,res) => {
    const id =req.body.id
    const product = await prisma.product.findUnique({
        where : {
            id : Number(id)
        },
        include: {
            payment: true
        }
    })
    if (!product){
        return res.status(400).json({
            message : "data not found"
        })
    }
     return res.json({
        message : "successfully retrieved product data",
        data : product
    })
}

export const getALL =  async (req,res) => {
    const product = await prisma.product.findMany({
        include: {
            payment: true
        }
    })

     return res.json({
        message : "successfully retrieved all data",
        data : product
    })
}

export const update = async (req,res) => {
    try {
        const { id, name, type, price } = req.body

        const updateProduct = await prisma.product.update({
            where: {
                id: Number(id)
            },
            data: {
                name: name,
                type: type,
                price: price
            },
            include: {
                payment: true
            }
        })

       return res.json({
            message: "data updated successfully",
            data: updateProduct
        })

    } catch (error) {
        
       return res.status(400).json({
            message: "id failed to update, id not found"
        })
    }
}

export const destroy = async (req, res) => {
    try {
        const { id } = req.body

        await prisma.product.delete({
            where: {
                id: Number(id)
            }
        })

        return res.json({
            message: "Data deleted successfully"
        })
    } catch (error) {
        return res.status(400).json({
            message: "failed to delete, id not found"
        })
    }
}