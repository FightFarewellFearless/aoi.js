const { Time } = require("../core/Time");
const DISCORD_EPOCH = 1420070400000;
/**
 * @param {import("..").Data} d
 */
module.exports = async d => {
    const data = d.util.aoiFunc(d);
    if (data.err) return d.error(data.err);

    // valid format: time, ms
    const [firstSnowflake, secondSnowflake, outputFormat = "time"] = data.inside.splits;
    
    if (isNaN(firstSnowflake) || isNaN(secondSnowflake)) 
        return d.aoiError.fnError(d, 'custom', {inside: data.inside}, 'Invalid Snowflake Provided In');
    if (!["time", "ms"].includes(outputFormat))
        return d.aoiError.fnError(d, 'custom', {inside: data.inside}, 'Invalid Format Provided In, Must Be Either "time" or "ms"');

    const firstTimestampBigInt = BigInt(firstSnowflake) >> 22n;
    const firstTimestamp = new Date(Number(firstTimestampBigInt) + DISCORD_EPOCH);

    const secondTimestampBigInt = BigInt(secondSnowflake) >> 22n;
    const secondTimestamp = new Date(Number(secondTimestampBigInt) + DISCORD_EPOCH);

    const timeDifferenceinMS = Math.abs(secondTimestamp.getTime() - firstTimestamp.getTime());

    switch (outputFormat) {
        case "time":
            data.result = Time.format(timeDifferenceinMS).toString();
            break;
        case "ms":
            data.result = timeDifferenceinMS;
            break;
    }

    return {
        code: d.util.setCode(data)
    }
}
