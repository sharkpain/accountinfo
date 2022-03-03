module.exports = {
    execute: function (message, args) {
        let finalMessage = `created utc: ${new Date(message.author.createdTimestamp).toUTCString()}\n`
        finalMessage += `created timestamp: ${message.author.createdTimestamp}\n`
        finalMessage += `seconds ago: ${((parseInt(Date.now()) - parseInt(message.author.createdTimestamp)) / 1000).toFixed(0)}\n`
        finalMessage += `minutes ago: ${((parseInt(Date.now()) - parseInt(message.author.createdTimestamp)) / 1000 / 60).toFixed(1)}\n`
        finalMessage += `hours ago: ${((parseInt(Date.now()) - parseInt(message.author.createdTimestamp)) / 1000 / 60 / 60).toFixed(2)}\n`
        finalMessage += `days ago: ${((parseInt(Date.now()) - parseInt(message.author.createdTimestamp)) / 1000 / 60 / 60 / 24).toFixed(2)}\n`
        finalMessage += `years ago: ${((parseInt(Date.now()) - parseInt(message.author.createdTimestamp)) / 1000 / 60 / 60 / 24 / 365).toFixed(3)}\n` //1646340926723 / 1000 / 60 / 60 / 24 / 365
        message.channel.send(finalMessage)
    }
}
