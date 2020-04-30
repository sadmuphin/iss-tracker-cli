const 
    Table = require('cli-table3'),
    { createRow, warning } = require('../utils'),
    iss = require('./issInfo'),
    dayjs = require('dayjs'),
    { version: v, author, repository: rep } = require('../../package.json');


/**
 * Creates the actual Info Table.
 *
 * @param {'km' | 'miles' | 'kilometers'} units The units the data should be returned with, either `metric` or `imperial`
 * @param {Array<string>} extraInfo an array of extra info from the server level.
 * 
 * @returns {Promise<string>} The table
 */
module.exports = async (unitsToGet, extraInfo) => {
    
    // Includes the table, and some other text.
    let stuffToReturn = [];

    for (const info of extraInfo) 
        stuffToReturn.push('Note:'.bgCyan.bold + ' ' + info);


    // Check if the units are anything other than km or miles
    if (unitsToGet && !['km', 'miles', 'kilometers'].includes(unitsToGet)) {
        stuffToReturn.push(warning('Units can only be \'km\' (kilometers) or \'miles\'.'
        + ' Information will be in the deafult units: \'km\' (kilometers)'.brightGreen));
        unitsToGet = 'kilometers';
    }

        
    let table = new Table(); // Creates the actual table

    let issInfo = await iss.getIssData(unitsToGet);
    if (!issInfo) return;

    let astros = await iss.getAstros();
    astros = !astros ? 'N/A' : astros.join('\n');

    let units = issInfo.units === 'kilometers' ? { a: 'km', v: 'km/h' } : { a: 'mi', v: 'mph' };

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