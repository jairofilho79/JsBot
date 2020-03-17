

class User {
    constructor() {
        this._name = "";
        this._phone = "";
        this._address = "";
        this._email = "";
    }

    getName() {return this._name;}
    
    getAddress() {return this._address}

    getPhone() {return this._phone}

    getEmail() {return this._email}

    setName(name) {this._name = name}

    setAddress(address) {this._address = address}

    setPhone(phone) {this._phone = phone}

    setEmail(email) {this._email = email}

    getNextStep() {
        for (let attribute in this) {
            if(this[attribute] === "") return attribute;
        }
        return false;
    }

    setNextStep(value) {
        
       const nextStep = this.getNextStep()

       if(nextStep === false) return null;

       this[nextStep] = value;
    }

    getNextStepText() {
        let step = "";
        switch(this.getNextStep()) {
            case "_name":
                step = "nome";
                break;
            case "_address":
                step = "endereço";
                break;
            case "_phone":
                step = "telefone";
                break;
            case "_email":
                step = "e-mail";
                break;
            default:
                return false;
        }
        return `Por favor, insira seu ${step}`;
    }

}

const users = []

exports.addUser = () => {
    users.push(new User());
    return users.length - 1;
}

exports.getUser = (index) => {
    return users[index];
}

exports.removeUser = (index) => {
    return users.slice(index, 1);
}



