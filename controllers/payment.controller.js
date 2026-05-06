import {prisma} from "../lib/prisma.js"

export const create = async (req,res) => {
    const body = req.body

    await prisma.payment.create({
        data : {
            status: body.status,
            customerID: body.customerID,
            productID: body.productID,
            transactionID: body.transactionID
        }
    })

    return res.json ({
        message : "payment added successfully"
    })

}

export const getById = async (req,res) => {
    const id =req.body.id
    const payment = await prisma.payment.findUnique({
        where : {
            id : Number(id)
        },
        include: {
            customer: true,
            product: true,
            transaction: true
        }
    })
    if (!payment){
        return res.status(400).json({
            message : "data not found"
        })
    }
     return res.json({
        message : "successfully retrieved payment data",
        data : payment
    })
}

export const getALL =  async (req,res) => {
    const payment = await prisma.payment.findMany({
        include: {
            customer: true,
            product: true,
            transaction: true
        }
    })

     return res.json({
        message : "successfully retrieved all data",
        data : payment
    })
}

export const update = async (req,res) => {
    try {
        const { id, status } = req.body

        const updatePayment = await prisma.payment.update({
            where: {
                id: Number(id)
            },
            data: {
                status: status
            },
            include: {
                customer: true,
                product: true,
                transaction: true
            }
        })

       return res.json({
            message: "data updated successfully",
            data: updatePayment
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

        await prisma.payment.delete({
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