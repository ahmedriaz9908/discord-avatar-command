const Discord = require("discord.js");
const Client = new Discord.Client();
const prefix = "!"


Client.on(`ready`, async function() {
console.log(`Logged in`);      
          });
          
Client.on("message", async message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g) //arguments
    const command = args.shift().toLowerCase(); //command

    if (message.content.indexOf(prefix) !== 0) return;
    
if (command === "ban") {
     
    if (!message.guild) return; //if command is run in a dm, dont run
    if (!args[0]) return; //if no one is mentioned, then do nothing (obviously)
    var user = message.mentions.members.first(); //if a person is mentioned, get their member property 
    if (!user) user = message.guild.member(Client.users.get(args[0])) //for those with developer mode on,
    // you can ban someone with their id whos been in the server in the past, even if they're currently not in it
    let reason = args.slice(1).join(' '); //The reason is everything after the mentioned user
    if (!reason) reason = "No reason specified."
    
    var BanEmbed = new Discord.RichEmbed()
    .setDescription("**Ban**")
    .setColor("RANDOM") //set color of the embed. 
    .addField("Banned user", `${user.user.tag}`) //get the tag of the USER property of the banned member
    .addField("Moderator", `<@${message.author.id}>, ${message.author.tag}`) //tag the moderator who banned the member
    .addField("Reason", reason) //add the reason to the embed
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("nice try buddy :)") //dont ban the person
    //if the moderator doesnt have ban permission
    user.ban(reason).then(() => { //ban them
        if (!message.guild.members.has(user)) { 
            message.channel.send(BanEmbed)  //if the ban was successful, send the embed to the channel
        } else {
            message.channel.send("I couldn't ban that user :(")
        }
    }).catch((err) => {
        console.log(err)
    })

 
}



})

Client.login("YOUR BOTS TOKEN HERE")
