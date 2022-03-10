const User = require('../models/userModel');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

function createToken(user, SECRET_KEY, expiresIn){
    const { id, name, username, email } = user;
    const payload = {
        id,
        name,
        username,
        email
    };
    
    return jwt.sign(payload, SECRET_KEY, {expiresIn});
}

async function register(input){
    const newUser = input;
    newUser.email = newUser.email.toLowerCase();
    newUser.username = newUser.username.toLowerCase();
    newUser.email = newUser.email.toLowerCase();

    const { name, username, email, password } = newUser;

    //validar que no exista el email
    const foundEmail = await User.findOne({ email });
    if(foundEmail) throw new Error('El email ya existe');

    //validar que no exista el usuario
    const foundUsername = await User.findOne({ username });
    if(foundUsername) throw new Error('El usuario ya existe');

    //encriptar la contraseña
    const salt = await bcryptjs.genSalt(10);
    newUser.password = await bcryptjs.hash(password, salt);

    try {
        
        const user = new User(newUser); 
        user.save();
        return user;

    } catch (error) {
        console.log(error);
    }
}

async function login(input){
    const { email, password } = input;

    const emailFound = await User.findOne({ email: email.toLowerCase() });
    if(!emailFound) throw new Error('Usuario y/o conraseña incorrectos');

    const passwordCorrect = await bcryptjs.compare(password, emailFound.password);
    if(!passwordCorrect) throw new Error('Usuario y/o conraseña incorrectos');

    return {
        token: createToken(emailFound, process.env.SECRET_KEY, '1d')
    }
}

module.exports = {
    register,
    login
}