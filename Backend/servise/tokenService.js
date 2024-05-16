const jwt = require('jsonwebtoken');

class TokenService {
    generateTokens(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn:'8h'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn:'30d'})
        return{
            accessToken,
            refreshToken
        }
    }
    validateRefreshToken(token){
        try{
            const tokenData = startsWith(token, 'Bearer ')? token.split(' ')[1] : token;
            const userData = jwt.verify(tokenData, process.env.JWT_REFRESH_SECRET);
            return userData;
        }catch(e){
            return null;
        }
    }  
}

module.exports = new TokenService();