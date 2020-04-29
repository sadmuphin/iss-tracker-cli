const 
    Table = require('cli-table3'),
    { createRow } = require('../utils'),
    iss = require('./issInfo'),
    dayjs = require('dayjs'),
    { version: v, author, repository: rep } = require('../../package.json');


/**
 * Creates the actual Info Table.
 *
 * @returns {Promise<string>} The table
 */
module.exports = async () => {
    
    // Includes the table, and some other text.
    let stuffToReturn = [];

    let table = new Table(); // Creates the actual table

    let issInfo = await iss.getIssData();
    if (!issInfo) return;

    let astros = await iss.getAstros();
    astros = !astros ? 'N/A' : astros.join('\n');

    let units = issInfo.units === 'kilometers' ? { a: 'km', v: 'km/h' } : { a: 'miles', v: 'mph' };

    table.push(
        [
            { 
                colSpan: 4, 
                content:`ISS Tracker (v. ${v})\n`.blue.bold 
                    + 'Recorded at: '.green.bold + dayjs.unix(issInfo.timestamp).toString().magenta.bold,

                hAlign: 'center' 
            }
        ],
        [
            { colSpan: 2, content: 'Visibility:'.cyan.bold, }, 
            { colSpan: 2, content: issInfo.visibility.bold.green }
        ],

        createRow(['Latitude:', issInfo.latitude.toString()], ['Longitude:', issInfo.longitude.toString()]),
        createRow(['Solar Lat.:', issInfo.solar_lat.toString()], ['Solar Long.:', issInfo.solar_lon.toString()]),
        createRow(['Orbit Height:', `${issInfo.altitude} ${units.a}`], ['Velocity:', `${issInfo.velocity} ${units.v}`]),

        [
            { colSpan: 2, content: 'People currently on the ISS:'.cyan.bold, vAlign: 'center' }, 
            { colSpan: 2, content: astros.magenta.bold }
        ]

    );
    

    
    stuffToReturn.push(table.toString());

    stuffToReturn.push(' ----------------------------------'.gray);
    stuffToReturn.push('   Made by: '.magenta.bold + author.bgBlue.bold);
    stuffToReturn.push('   Code at: '.magenta.bold + rep.grey);
    stuffToReturn.push(' ----------------------------------'.gray);


    return stuffToReturn.join('\n');
}