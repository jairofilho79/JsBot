const userDAO = require("../dao/usuarioDAO");

const {eventEmitter} = require('../utils/event');

let currentUserIndex;

exports.registerMode = (message) => {
    let user;

    if(currentUserIndex === undefined) {
        currentUserIndex = userDAO.addUser();
        user = userDAO.getUser(currentUserIndex);
        return user.getNextStepText()
    }

    user = userDAO.getUser(currentUserIndex);

    user.setNextStep(message)

    const nextStep = user.getNextStepText();

    const registerComplete = !nextStep;


    if(registerComplete) {
        currentUserIndex = undefined;
        eventEmitter.emit('registrationDone');
        console.log("User created: ",user);
        return "Certo! Concluímos seu cadastro! Obrigado!"
    }
    
    return nextStep;
}

exports.cancelRegisterMode = () => {
    userDAO.removeUser(currentUserIndex);
    currentUserIndex = undefined;
}

exports.resumeRegisterMode = () => {
    user = userDAO.getUser(currentUserIndex);
    return user.getNextStepText();
}