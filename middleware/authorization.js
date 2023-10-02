const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
    // console.log(req.headers)
    try {
        const bearerToken = req.headers.authorization
        // console.log(bearerToken)
        const token = bearerToken.split(' ')[1]
        let decoded = jwt.verify(token, process.env.SUPER_SECRET_KEY)
        // console.log(decoded)
        req.decoded = decoded
        next()
    } catch (error) {
        res.status(error.status || 401).json(error.message)
    }
}

module.exports = verifyToken