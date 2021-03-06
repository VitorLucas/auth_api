const jwt = require('jsonwebtoken')

module.exports = function (request, response, next)
{
    const token = request.header('auth-token')

    if (!token) { return response.status(401).send('Access denied')}

    try 
    {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        request.user = verified
        next()
    } catch (error) {
        console.log(error)
        return response.status(401).send('Invalid Token')
    }
}