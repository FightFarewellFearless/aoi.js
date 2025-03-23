const { Time } = require("../core/Time");
const epoch = 1420070400000;
/**
 * @param {import("..").Data} d
 */
module.exports = async d => {
    const data = d.util.aoiFunc(d);
    if (data.err) return d.error(data.err);

    // valid format: time, ms
    let [id1, id2, format = "time"] = data.inside.splits;
    id1 = Number(id1);
    id2 = Number(id2);
    
    if(isNaN(id1) || isNaN(id2)) return d.aoiError.fnError(d, 'custom', {inside: data.inside}, 'Invalid ID Provided In');
    if(!["time", "ms"].includes(format))
        return d.aoiError.fnError(d, 'custom', {inside: data.inside}, 'Invalid Format Provided In, Must Be Either "time" or "ms"');

    const date1BigInt = BigInt(id1) >> 22n;
    const date1 = new Date(Number(date1BigInt) + epoch);

    const date2BigInt = BigInt(id2) >> 22n;
    const date2 = new Date(Number(date2BigInt) + epoch);

    const differences = Math.abs(date2.getTime() - date1.getTime());

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
