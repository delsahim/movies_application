const {User} = require('../models')
const {generateToken} = require('../utils/jwt')
const {validationResult} = require('express-validator')

const signup = async (req, res) => {
    const {username, email, password} = req.body
    try{
        const user = await User.create({username, email, password})
        const token = generateToken(user)
        res.status(201).json({token})
    } catch (error){
        if (error.Name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({error: "This user already exists"})
        }
        res.status(500).json({error:"An error occured in signup"})
    }
}

const login = async (req, res) => {
    const {username, password} = req.body
    try {
        const user = await User.findOne({where:{username}})
        if (!user || !(await user.validPassword(password))) {
            return res.status(401).json({error:"Invalid password or username"})
        }
        const token =generateToken(user)
        res.status(200).json({token})
    } catch (error) {
        res.status(500).json({error:"An error occured while logging in"})
    }
}

module.exports ={
    signup,
    login
}