const router = require('express').Router()
const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { registerValidation, loginValidation } = require('../model/validationSchemas/Schemas')

//index(getall), show , store, update, destroy

router.post('/register', async (request, response) => {
   
    const {error} = registerValidation(request.body);

    if (error) {  return response.status(400).send(error.details[0].message)}
    
    const emailExists = await User.findOne({ email: request.body.email } );

    if (emailExists) {  return response.status(400).send('Email is already used') }

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword =  bcrypt.hashSync(request.body.password, salt)

    const user = new User({
        name: request.body.name,
        email:request.body.email,
        password: hashedPassword,
    })

    try {
        const savedUser = await user.save()
        
        return response.send(savedUser.id)
    
    } catch (error) {
       
        response.status(400).send(error);
    }
});

router.post('/login', async (request, response) =>{
    const { error } = loginValidation(request.body)
    
    if (error) { return response.status(400).send(error.details[0].message)}

    const user = await User.findOne({ email: request.body.email } );

    if (!user) {  return response.status(400).send('Email or passwor is not valid') }

    const validPass = bcrypt.compareSync(request.body.password, user.password)
    
    if (!validPass) { return response.status(400).send('Wrong password')}

    //create and assing the token

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET )

    response.header('auth-token', token).send(token)
   
    response.send('Loged in')
    

    
});

module.exports = router