const { Time } = require("../core/Time");

/**
 * @param {import("..").Data} d
 */
module.exports = d => {
    const data = d.util.aoiFunc(d);

    const [rebootAfter = '0'] = data.inside.splits;

    try {
        process.on("exit", () => {
            require("child_process").spawn(process.argv.shift(), process.argv, {
                cwd: process.cwd(),
                detached: true,
                stdio: "inherit",
            });
        });
    } catch (e) {
        return d.aoiError.fnError(d, 'custom', {}, `Failed To Restart With Reason: ${e}`);
    }

    if (rebootAfter === '0') {
        process.exit();
    } else {
        const time = isNaN(rebootAfter) ? Time.parse(rebootAfter)?.ms : Number(rebootAfter);
        setTimeout(process.exit, time);
    }

    return {
        code: d.util.setCode(data),
    }
}