// Contains various information and data.

exports.possibleQueries = [
    'mono',
    'units'
]


exports.messages = {
    notAQuery: (query, closest) => {
        let string = '\'' + query.brightYellow.bold + '\'' + ' is not a query.'
        if (closest)
            string += ' Maybe you meant \''
            + closest.brightGreen.bold + '\' instead?'   
        return string;
    }
}