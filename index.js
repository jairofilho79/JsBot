const Bottr = require('bottr');
const BottrApp = require('bottr-app');
const bot = new Bottr.Bot();
const fs = require('fs');
const utils = require("./utils/utils");
const { promisify } = require('util'); 

const {eventEmitter} = require('./utils/event');

const registerUser = require('./features/registerUser');

const readFile = promisify(fs.readFile);

let mode = "";
let cancel = false;

(async () => {
    const greetings = utils.csvToArray(
        await readFile(__dirname + '/dictionaries/greetings.csv', 'utf8')
    );

    const goodbyes = utils.csvToArray(
        await readFile(__dirname + '/dictionaries/goodbyes.csv', 'utf8')
    );

    const registerUser = utils.csvToArray(
        await readFile(__dirname + '/dictionaries/registerUser.csv', 'utf8')
    );

    bot.hears(utils.createStartReGexArray(greetings), function(message, session) {
        if(!mode)
            return session.send("Olá! Seja muito bem vindo(a)! Em que posso ajudar?");
        return
    });

    bot.hears(utils.createReGexArray(registerUser), function(message, session) {
        if(!mode) {
            mode = "register";
            return session.send("Certo! Vamos cadastrar você! Se quiser cancelar, basta escrever 'Cancelar' ok?");
        }
        return
    });
    
    bot.hears(utils.createStartReGexArray(goodbyes), function(message, session) {
        if(!mode)
            return session.send("Tchau! Sempre que precisar, estou por aqui!");
        return
    });

    bot.hears([/cancelar/i], function(_, session) {
        if(mode)
            return confirmCancelMode(session);
        session.send("Você não está executando uma operação atualmente!");
    })
    
    bot.hears([/.+/], function(message, session) {

        if(cancel) {
            cancel = false;
            if(message.text.match(/sim/i)) {
                cancelMode();
                return session.send("Tudo bem. Operação cancelada!");
            } else {
                return session.send(resumeMode());
            }
        }

        let sendMessage = execMode(message.text);

        if(sendMessage) {
            return session.send(sendMessage);
        }
        
        session.send("Talvez eu não consiga lhe ajudar. Por favor, contate os nossos atendentes. Obrigado!");
    });

    eventEmitter.on("registrationDone", () => {
        mode = "";
    })
})();

function confirmCancelMode(session) {
    session.send(`Você está executando uma operação atualmente. Tem certeza que deseja cancelá-la? Diga 'Sim' para cancelar`);
    cancel = true;
}

function cancelMode() {
    switch(mode) {
        case "register": {
            registerUser.cancelRegisterMode();
            break;
        }
    }
    mode = "";
}

function execMode(message) {
    switch(mode) {
        case "register": 
            return registerUser.registerMode(message);
        default:
            return false;
    }
}

function resumeMode() {
    switch(mode) {
        case "register":
            return registerUser.resumeRegisterMode();
    }
}

bot.use(new BottrApp())
bot.listen()






