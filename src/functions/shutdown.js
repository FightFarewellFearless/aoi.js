const { Time } = require("../core/Time");

/**
 * @param {import("..").Data} d
 */
module.exports = async (d) => {
    const data = d.util.aoiFunc(d);
    
    const [shutdownAfter = '0'] = data.inside.splits;
    
    const shutdown = () => {
        d.client.destroy();
        process.exit();
    }

    if(shutdownAfter === '0') {
        shutdown();
    } else {
        const time = isNaN(shutdownAfter) ? Time.parse(shutdownAfter)?.ms : Number(shutdownAfter);
        setTimeout(shutdown, time);
    }

    return {
        code: d.util.setCode(data),
    }
};