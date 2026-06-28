import bcrypt from 'bcrypt'
import { prisma } from '../lib/prisma.js'

export const register = async (req, res) => {
    const body = req.body
    const password = body.password

    const isUsernameExist = await prisma.customer.findUnique({
        where: {
            username: body.username
        }
    })

    if (isUsernameExist){
        return res.status(400).json({
            message: 'Username Already Exist'
        })
    }

    const hashPassword = bcrypt.hashSync(password, 12)
    
    await prisma.customer.create({
        data: {
            username: body.username,
            password: hashPassword,
            address: body.address,
            noTelp: body.noTelp
        }
    })

    return res.json({
        message: 'Register Successfully'
    })
}

export const login = async (req, res) => {
    const body = req.body
    const username = body.username
    const password = body.password

    const isUsernameExist = await prisma.customer.findUnique({
        where: {
            username: username
        }
    })

    if (!isUsernameExist) {
        return res.status(404).json({
            message: 'Username Not Found'
        })
    }

    const hashPassword = isUsernameExist.password

    if(!bcrypt.compareSync(password, hashPassword)){
        return res.status(401).json({
            message:'Incorrect Password'
        })
    }

    return res.json ({
        message: 'Login Successfully',
        data: {
            username:isUsernameExist.username,
            role: isUsernameExist.role,
            address: isUsernameExist.address,
            noTelp: isUsernameExist.noTelp
        }
    })
}

export const getALL =  async (req,res) => {
    const customer = await prisma.customer.findMany({})

     return res.json(customer)
}