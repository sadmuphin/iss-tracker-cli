// Utils

/**
 * Check if the request came from a Command Line based HTTP client (specifically HTTPie and curl).
 * @param {string} userAgent The User Agent of the Requesting Client.
 */
exports.isFromCommandLine = userAgent => (/curl|httpie/i).test(userAgent);


/**
 * Creates a new Row for the table.
 * 
 * @param {[string, string]}
 * @param {[string, string]}
 * 
 * @returns The row for Ascii Table.
 */
exports.createRow = ([a, b], [x, y]) => 
    [
        { content: a.red.bold, vAlign: 'center' }, { content: b.brightYellow, vAlign: 'center' },
        { content: x.red.bold, vAlign: 'center' }, { content: y.brightYellow, vAlign: 'center' },
    ];


/**
 * Generates warning text:
 * 
 * @param {string} msg The warning message
 */
exports.warning = msg => 
    'Warning:'.bgYellow.bold + ' ' + msg;



/**
 * Creates a 'not a query' message.
 * 
 * @param {string} query The query the user used that isn't valid.
 * @param {string} closest The closest thing to that invalid query.
 * 
 * @returns {string}
 */
exports.notAQuery = (query, closest) => {
    let string = '\'' + query.brightYellow.bold + '\'' + ' is not a query.'
    if (closest)
        string += ' Maybe you meant \''
        + closest.brightGreen.bold + '\' instead?'   
    return string;
}



/**
 * Creates an error message for a specific HTTP error code.
 * 
 * @param {string | number} code The httpcode the error is based on.
 * @param {...string} messages As many messages as you want!
 * 
 * @returns {string}
 */
exports.error = (code, ...messages) => {
    
    // Base string. Every thing else will be appended.
    let string = `Error [${code}]:`.brightRed.bold;

    for (const message of messages) {
        if (!(message === undefined || message === null || message === NaN)) 
            string += ' ' + message;
    }

    string += '\n';
    return string;
}





