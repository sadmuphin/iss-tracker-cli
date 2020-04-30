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


