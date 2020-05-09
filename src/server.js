// Main file

// Express based constants
const 
    express = require('express'),
    app = express();


const 
    utils = require('./utils'),
    cli = require('./cli/cli'),
    stripColours = require('better-strip-color'),
    { findBestMatch } = require('string-similarity'),
    { possibleQueries } = require('./data');


const
    port = process.env.PORT || 3030,
    { version: v, repository  } = require('../package.json');


require('colors'); // Load in colors.


// Main Endpoint
app.get('/', async (req, res) => {
    
    // The queries
    const queries = req.query;
    
    // The User Agent, used to id the requesting client.
    const userAgent = req.headers['user-agent']; 
    
    if (utils.isFromCommandLine(userAgent)) {

        // An array to house any additional info from the server level, such as if a query passed is not valid.
        const addInfo = [];

        for (const q of Object.keys(queries))
            if (!possibleQueries.includes(q)) { 
                let bestMatch = findBestMatch(q, possibleQueries).bestMatch;

                if (bestMatch.rating <= 0.15)
                    bestMatch = {};

                addInfo.push(
                    utils.notAQuery(q, bestMatch.target)
                );
            }
            
            
        

        try {
            
            let table = await cli(queries.units, addInfo);
            if (!table) throw new Error();

            if ('mono' in queries)
                table = stripColours(table);
            
            
            res.send(
                '\n' + 
                table 
                + '\n'
            );

        } catch(e) {
            console.error(e);
            res.status(500)
                .send(utils.error(500, 'An internal error occurred. Posibily originating from one of the apis.'));
        }
        

    } else
        // Not a Command Line HTTP Client, sorry.
        res.status(404).send(`Endpoint can only be accessed by cURL and HTTPie.\nCode: ${repository}`);
});




// 404 Handler
app.use((req, res) => {
    
    if (utils.isFromCommandLine(req.headers['user-agent'])) {

        // To append extra information.
        let extra = [];

        // The url that the person tried to access.
        // Strips it also of the queries.
        let url = req.url.replace(/\?.+/, '');

        // Some information
        if (req.method !== 'GET' && url === '/') {
            let method = req.method;

            extra.push(
                '\nAlso you appeared to have used the \'' + method.brightRed.bold + '\' HTTP method instead of \''
                + 'GET'.brightGreen.bold + 
                `'. \nNote that the endpoint can only be accessed using the '${'GET'.brightGreen.bold}' HTTP method.`
            );
        }

        res.status(404).send(utils.error(404, 'This endpoint does not exist.', ...extra));

    } else
        // Not a Command Line HTTP Client, sorry.
        res.status(404).send(`Endpoint can only be accessed by cURL and HTTPie.\nCode: ${repository}`);

});



app.listen(port, () => console.log(`ISS Tracker CLI (at version '${v}') is online and on port ${port}!`));

