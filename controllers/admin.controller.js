import bcrypt from 'bcrypt'
import { prisma } from '../lib/prisma.js'

export const register = async (req, res) => {
    const body = req.body
    const password = body.password

    const isUsernameExist = await prisma.admin.findUnique({
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
    
    await prisma.admin.create({
        data: {
            username: body.username,
            password: hashPassword
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

    const isUsernameExist = await prisma.admin.findUnique({
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
            role: isUsernameExist.role
        }
    })
}