/**
 * @param {import("..").Data} d
 */
module.exports = async d => {
    const data = d.util.aoiFunc(d);
    let [ channel = d.channel.id, message = d.message.id ] = data.inside.splits

    channel = await d.util.getChannel(d, channel)
    
    data.result = (await d.util.fetchMessage(channel, message)).reference?.guildId

    return {
        code: d.util.setCode(data)
    }
}
