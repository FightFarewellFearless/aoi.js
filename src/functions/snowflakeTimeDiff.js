const { Time } = require("../core/Time");
const epoch = 1420070400000;
/**
 * @param {import("..").Data} d
 */
module.exports = async d => {
    const data = d.util.aoiFunc(d);
    if (data.err) return d.error(data.err);

    // valid format: time, ms
    let [firstSnowflake, secondSnowflake, format = "time"] = data.inside.splits;
    firstSnowflake = Number(firstSnowflake);
    secondSnowflake = Number(secondSnowflake);
    
    if(isNaN(firstSnowflake) || isNaN(secondSnowflake)) 
        return d.aoiError.fnError(d, 'custom', {inside: data.inside}, 'Invalid Snowflake Provided In');
    if(!["time", "ms"].includes(format))
        return d.aoiError.fnError(d, 'custom', {inside: data.inside}, 'Invalid Format Provided In, Must Be Either "time" or "ms"');

    const timestamp1BigInt = BigInt(firstSnowflake) >> 22n;
    const timestamp1 = new Date(Number(timestamp1BigInt) + epoch);

    const timestamp2BigInt = BigInt(secondSnowflake) >> 22n;
    const timestamp2 = new Date(Number(timestamp2BigInt) + epoch);

    const differences = Math.abs(timestamp2.getTime() - timestamp1.getTime());

    switch(format) {
        case "time":
            data.result = Time.format(differences).toString();
            break;
        case "ms":
            data.result = differences;
            break;
    }

    return {
        code: d.util.setCode(data)
    }
}
