const { verifytoken } = require('../utils/jwt')

const authenticate = (req, res, next) => {
    const token = req.header('Authorization')
    const data = verifytoken(token)

    if (!data) {
        return res.status(401).json({error:"Valid Autorization token needed"})
    }
    req.user = data
    next()
}

module.exports = authenticate