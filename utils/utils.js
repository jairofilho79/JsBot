exports.createStartReGexArray = (stringArray) => {
    return stringArray.map(item => {
        return new RegExp(`^${item}`, "i");
    })
}

exports.createReGexArray = (stringArray) => {
    return stringArray.map(item => {
        return new RegExp(`${item}`, "i");
    })
}

exports.findCSVLineBreaker = (csv) => {
    if(csv.indexOf("\r\n") !== -1) return "\r\n";
    if(csv.indexOf("\r") !== -1) return "\r";
    if(csv.indexOf("\n") !== -1) return "\n";
}

exports.csvToArray = (csv) => {
    const lineBreaker = exports.findCSVLineBreaker(csv);
    return csv.split(lineBreaker);
}

exports.delay = (time) => {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }

// exports.capitalize = (str) => {
//     return str.charAt(0).toUpperCase() + str.slice(1);
// }