function proceed(user, message) {
    let finalMessage = `${user.tag}\n`
        finalMessage += `created utc: ${new Date(user.createdTimestamp).toUTCString()}\n`
        finalMessage += `created timestamp: ${user.createdTimestamp}\n`
        finalMessage += `seconds ago: ${((parseInt(Date.now()) - parseInt(user.createdTimestamp)) / 1000).toFixed(0)}\n`
        finalMessage += `minutes ago: ${((parseInt(Date.now()) - parseInt(user.createdTimestamp)) / 1000 / 60).toFixed(1)}\n`
        finalMessage += `hours ago: ${((parseInt(Date.now()) - parseInt(user.createdTimestamp)) / 1000 / 60 / 60).toFixed(2)}\n`
        finalMessage += `days ago: ${((parseInt(Date.now()) - parseInt(user.createdTimestamp)) / 1000 / 60 / 60 / 24).toFixed(2)}\n`
        finalMessage += `years ago: ${((parseInt(Date.now()) - parseInt(user.createdTimestamp)) / 1000 / 60 / 60 / 24 / 365).toFixed(3)}\n` //1646340926723 / 1000 / 60 / 60 / 24 / 365
        message.channel.send(finalMessage)
}

module.exports = {
    execute: function (message, args, util) {
        let user = message.author;
        if (args[0]) {
            let isSnowflake = /^[0-9]{18,19}$/gm.test(args[0])
            if(isSnowflake) {
                message.guild.members.fetch(args[0]).then(guser => {
                    user = guser?.user
                    if (!user) return message.channel.send("User not found, try mentioning them instead of using their id")
                    proceed(user, message)
                    
                }).catch(error => {
                    if (error.message.includes("Unknown User")) {
                        message.channel.send("User not found, try mentioning them instead of using their id")
                    } else util.apis["core-error"].api.error(error);
                })
            } else {
                if (message.mentions.users.first()) user = message.mentions.users.first();
                if (!message.mentions.users.first()) user = null;
                if (!user) {
                    user = message.author
                    proceed(user, message)
                } else proceed(user, message)
            }
            
        } else {
            proceed(user, message)
        }
    }
}
