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
    { possibleQueries, messages } = require('./data');



const
    port = process.env.PORT || 3030,
    { version: v  } = require('../package.json');


require('colors'); // Load in colors.


app.get('/', async (req, res) => {
    
    // The queries
    const query = req.query;
    
    
    
    // The User Agent, used to id the requesting client.
    const userAgent = req.headers['user-agent']; 
    
    if (utils.isFromCommandLine(userAgent)) {

        // An array to house any additional info from the server level, such as if a query passed
        // is not from the possible ones.
        const addInfo = [];

        for (const q of Object.keys(query))
            if (!possibleQueries.includes(q)) { 
                let bestMatch = findBestMatch(q, possibleQueries).bestMatch;

                if (bestMatch.rating <= 0)
                    bestMatch = {};

                addInfo.push(
                    messages.notAQuery(q, bestMatch.target)
                )
            }
                

        try {
            
            let table = await cli(query.units, addInfo);
            if (!table) throw new Error();

            if ("mono" in query)
                table = stripColours(table);

            res.send(
                '\n' + 
                table 
                + '\n'
            );

        } catch(e) {
            console.error(e);
            res.status(500)
                .send('Error [500]: '.bold.red + 'An internal error has occurred, possibly from one of the APIs.\n');
        }
        

    } else
        // Not a Command Line HTTP Client, sorry.
        res.status(404).send();
});


app.listen(port, () => console.log(`ISS Tracker CLI (at version '${v}') is online and on port ${port}!`));

