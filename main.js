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
        headers: { 'Content-Type': 'application/json' },
        url: webhook,
        method: 'POST',
        json: {
          embeds: [{
            title: 'Title?',
            color: 0x16BE49,
            footer: {
              text: 'Footer?',
            },
            description: msg.content,
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
