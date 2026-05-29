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
    const id = req.params.id
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
     return res.json(payment)
}

export const getALL =  async (req,res) => {
    const payment = await prisma.payment.findMany({
        include: {
            customer: true,
            product: true,
            transaction: true
        }
    })

     return res.json(payment)
}

export const update = async (req, res) => {
    const id = Number(req.params.id)

    await prisma.payment.update({
        where: {
            id: id
        },
        data: req.body
    })

    return res.json ({
        message: 'Data has been updated'
    })
}

export const deletePayment = async (req, res) => {
    const id = Number(req.params.id)

    await prisma.payment.delete({
        where: {
            id: id
        }
    })

    return res.json({
        message:'Data has been deleted'
    })
}