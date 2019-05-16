const Discord = require('discord.js');
const request = require('request');
const fs = require('fs-extra');

const client = new Discord.Client();

const config = fs.readJSONSync('config.json');
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
  if (msg.channel.id === config.channelID) {
    config.webhooks.forEach((webhook) => {
      const payload = {
        // Read the discord embed documentation to see what else you can do with embeds!
        // https://discordapp.com/developers/docs/resources/channel#embed-limits
        url: webhook,
        method: 'POST',
        message: {
          embeds: [{
            title: 'Title?',
            color: 1490505,
            footer: {
              text: 'Footer?',
            },
            description: msg.content,
            // You can add up to 25 Fields!
            fields: [
              {
                name: 'Time',
                value: new Date().toTimeString().slice(0, 8),
                inline: false,
              },
            ],
          }],
        },
      };
      request(payload);
    });
  }
});

client.login(config.token);
