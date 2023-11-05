const JWT=require('jsonwebtoken');
const secret="SuperMan@123";

function createTokenForUser(user){
    const payload={
        fullname:user.fullname,
        phone:user.phone,
        _id: user._id,
        email: user.email,
        role:user.role,
    };
    const token=JWT.sign(payload,secret);
    return token;
}
function validateToken(token){
    const payload=JWT.verify(token,secret);
    return payload;
}

module.exports={
    createTokenForUser,
    validateToken,
}