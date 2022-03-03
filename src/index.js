module.exports = {
    execute: function (message, args) {
        message.channel.send(JSON.stringify(message.author))
    }
}
