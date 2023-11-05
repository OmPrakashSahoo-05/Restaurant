const {Router}=require("express");
const User=require("../models/user");
const router=Router();

router.get("/book",(req,res)=>{
    res.render("user");
})
router.get('/signin',(req,res)=>{
    return res.render("signin");
});
router.get('/signup',(req,res)=>{
     res.render("signup");
});
router.post('/signin',async(req,res)=>{
    const{email,password}=req.body;
    try{
        const token=await User.matchPasswordAndGenerateToken(email,password);
        return res.cookie("token",token).redirect("/availiability");
    }
    catch(error){
        return res.render("signin",{
            error: 'Incorrect Email Or Password',
        });
    }
    
});
router.post('/signup',async(req,res)=>{
    const {fullName,email,password,phone}=req.body;
    console.log(phone)
    await User.create({
        fullname: fullName,
        email: email,
        password:password,
        phone:phone,
    });
    return res.redirect('/user/signin');
})
router.get('/logout',(req,res)=>{
    res.clearCookie("token").redirect("/availiability");
})
module.exports=router;