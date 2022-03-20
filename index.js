// require packages
const Discord = require('discord.js');
const fs = require('fs');
const { Client, Intents } = require('discord.js');

//BOT settings
const { token } = require('./config.json');
var prefix = '!'

const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_VOICE_STATES);

// Create a new client instance
const client = new Client({
    presence: {
        status: 'idle',
        afk: false,
        activities: [{
            name: 'TEST BOT',
            type: 'WATCHING'
        }],
    },
    intents: myIntents
});



client.commands = new Discord.Collection();

// read commands files
var cmdFilesList = []
var countFilesList = []
let cmdFiles

var files = fs.readdirSync(`./modules/`);

for (var i = 0; i < files.length; i++) {
    var c = 0
    let nfiles = files[i]
    var output = fs.readdirSync(`./modules/${nfiles}/`);
    cmdFiles = output.filter(f => f.split(".").pop() === "js");
    for (a = 0; a < cmdFiles.length; a++) {
        cmdFilesList.push(cmdFiles[a])
        c = c + 1
    }
    countFilesList.push(c)

}
var i = 0
for (var x = 0; x < countFilesList.length; x++) {
    for (var z = 0; z < countFilesList[x]; z++) {
        let nfiles = files[x]
        let comamnd_file = cmdFilesList[i];
        let props = require(`./modules/${nfiles}/${comamnd_file}`);
        console.log(`${i + 1}: ${comamnd_file} loaded`);
        client.commands.set(props.config.name, props);
        i++
    }
}


// When the client is ready, run this code (only once)
client.on('ready', () => {
    console.log(`Hello, I'm ready!`);
});

//For commands sent in the text channel
client.on("messageCreate", msg => {
    if (msg.author.bot) return;
    let msg_array = msg.content.split(" ");
    let command = msg_array[0];
    let args = msg_array.slice(1);

    if (!command.startsWith(prefix)) return;
    if (client.commands.get(command.slice(prefix.length).toLowerCase())) {
        let cmd = client.commands.get(command.slice(prefix.length).toLowerCase());
        console.log('Requested command: ' + command)
        console.log('Given Argumments: ' + args)
        cmd.run(client, msg, args);
    }
});

// //For SLASH commands
client.on('interactionCreate', async interaction => {});

// Login to Discord with your client's token
client.login(token).catch(() => { console.log('Invaid TOKEN!') });