const jwt = require('jsonwebtoken')
let activationToken = (user,ActivationCode) =>{
    const token = jwt.sign({
        user,
        ActivationCode
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:"5m"
    });

    return token;
}

module.exports = activationToken;   