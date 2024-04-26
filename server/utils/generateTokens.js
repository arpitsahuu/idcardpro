
const generateTokens = (user) =>{
    console.log("usercall")
    let accesToken = user.generateAccesToken(user);
    console.log(accesToken)
    
    return {accesToken} ;
}

module.exports = generateTokens;