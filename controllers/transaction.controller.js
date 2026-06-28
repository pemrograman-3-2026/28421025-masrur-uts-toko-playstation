import {prisma} from "../lib/prisma.js"

export const create = async (req,res) => {
    const body = req.body

    await prisma.transaction.create({
        data : {
            amount: body.amount,
            paymentMethod: body.paymentMethod,
            customerID: Number (body.customerID)
        }
    })

    return res.json ({
        message : "transaction added successfully"
    })

}

export const getById = async (req,res) => {
    const id = req.params.id
    const transaction = await prisma.transaction.findUnique({
        where : {
            id : Number(id)
        },
        include: {
            customer: true,
            payment: true
        }
    })
     return res.json(transaction)
}

export const getALL =  async (req,res) => {
    const transaction = await prisma.transaction.findMany({
        include: {
            customer: true,
            payment: true
        }
    })

     return res.json(transaction)
}

export const update = async (req, res) => {
    const id = Number(req.params.id)

    await prisma.transaction.update({
        where: {
            id: id
        },
        data: req.body
    })

    return res.json ({
        message: 'Data has been updated'
    })
}

export const deleteTransaction = async (req, res) => {
    const id = Number(req.params.id)

    await prisma.transaction.delete({
        where: {
            id: id
        }
    })

    return res.json({
        message:'Data has been deleted'
    })
}