// Functions to get information related to the ISS
const 
    fetch = require('node-fetch'),
    { round } = require('mathjs'), // Will use the rounding function.
    { URLSearchParams } = require('url');


/**
 * Gets data on the current location, speed, velocity and altitude of the ISS.
 * Rounds where required to 3 D.P.
 * 
 * Data from: https://wheretheiss.at/ (https://wheretheiss.at/w/developer)
 * 
 * @argument {string} units The units
 * 
 * @returns {Promise} The object containg the required info.
 */
exports.getIssData = async (units = 'kilometers') => {

    if (units === 'km')
        units = 'kilometer';
    else if (units === 'mi')
        units = 'miles'


    // ISS Info
    let i = await fetch(`https://api.wheretheiss.at/v1/satellites/25544?units=${units}`);
    if (!i.ok) return;

    let issData = await i.json();

    for (const key of Object.keys(issData)) 
        if (typeof issData[key] === 'number')
            issData[key] = round(issData[key], 3);
    
    return issData;
}




/**
 * Gets info on the current people in space 
 * (Specifically on the ISS, although if needed is possible to specify another craft).
 * 
 * @returns {Promise<Array<string>>} An array of names of the astronauts in space.
 */
exports.getAstros = async (craft = 'ISS') => {

    const a = await fetch('http://api.open-notify.org/astros.json');
    if (!a.ok) return;

    const astros = await a.json();
    const astrosOnTheISS = astros.people
        .filter(p => p.craft === craft)
        .map(p => p.name)
        .sort(); // Sort alphabetically

    return astrosOnTheISS;

}