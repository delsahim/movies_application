const jwt =require('jsonwebtoken')

const SECRET_KEY = process.env.JWT_SECRET

const generateToken = (user) =>{
    return jwt.sign({id:user.id, username:user.username},SECRET_KEY, {expiresIn: '1h'})
};

const verifytoken  = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY)
    } catch (error){
        return null
    }
}

module.exports = {
    verifytoken,
    generateToken
}