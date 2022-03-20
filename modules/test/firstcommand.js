module.exports.run = async(bot, message, args) => {
    message.channel.send('You ran this command: ' + module.exports.config.name)
    message.channel.send(module.exports.config.description)
}
module.exports.config = {
    name: 'firstcommand',
    description: "This is my first test command",
}