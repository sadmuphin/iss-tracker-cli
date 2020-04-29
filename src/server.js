// Main file

// Express based constants
const 
    express = require('express'),
    app = express();


const 
    utils = require('./utils'),
    cli = require('./cli/cli');

const
    port = process.env.PORT || 3030,
    { version: v  } = require('../package.json');


require('colors'); // Load in colors.


app.get('/', async (req, res) => {


    // The User Agent, used to id the requesting client.
    const userAgent = req.headers['user-agent']; 
    
    if (utils.isFromCommandLine(userAgent)) {

        try {
            const table = await cli();
            if (!table) throw new Error();

            res.status(200).send(table + '\n');
        } catch(e) {
            res.status(500)
                .send('Error [500]: '.bold.red + 'An internal error has occurred, possibly from one of the APIs.');
        }
        

    } else
        // Not a Command Line HTTP Client, sorry.
        res.status(400).send();
});


app.listen(port, () => console.log(`ISS Tracker CLI (at version '${v}') is online and on port ${port}!`));

