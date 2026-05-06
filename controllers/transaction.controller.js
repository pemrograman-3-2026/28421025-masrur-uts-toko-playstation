import {prisma} from "../lib/prisma.js"

export const create = async (req,res) => {
    const body = req.body

    await prisma.transaction.create({
        data : {
            amount: body.amount,
            paymentMethod: body.paymentMethod,
            customerID: body.customerID
        }
    })

    return res.json ({
        message : "transaction added successfully"
    })

}

export const getById = async (req,res) => {
    const id =req.body.id
    const transaction = await prisma.transaction.findUnique({
        where : {
            id : Number(id)
        },
        include: {
            customer: true,
            payment: true
        }
    })
    if (!transaction){
        return res.status(400).json({
            message : "data not found"
        })
    }
     return res.json({
        message : "successfully retrieved transaction data",
        data : transaction
    })
}

export const getALL =  async (req,res) => {
    const transaction = await prisma.transaction.findMany({
        include: {
            customer: true,
            payment: true
        }
    })

     return res.json({
        message : "successfully retrieved all data",
        data : transaction
    })
}

export const update = async (req,res) => {
    try {
        const { id, amount, paymentMethod } = req.body

        const updateTransaction = await prisma.transaction.update({
            where: {
                id: Number(id)
            },
            data: {
                amount: amount,
                paymentMethod: paymentMethod
            },
            include: {
                customer: true,
                payment: true
            }
        })

       return res.json({
            message: "data updated successfully",
            data: updateTransaction
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

        await prisma.transaction.delete({
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