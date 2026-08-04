const { SlashCommandBuilder, MessageCollector } = require('discord.js');
const { replacer } = require('../util/message-replacer-collector.js');

const collectors = new Map();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('start')
        .setDescription('Starts the message collector.'),
    async execute(interaction) {
        // Get the channel where the command was issued
        const channel = interaction.channel;
        // Check if there is already a collector for this channel
        if (collectors.has(channel.id)) {
            return await interaction.reply('The bot is already running in this channel.');
        }
        await interaction.reply('https://klipy.com/gifs/rien-limbus-1');
        // Create a message collector
        const collector = new MessageCollector(channel);
        collector.on('collect', async (message) => replacer(message, channel));
        // Store the collector in the map
        collectors.set(channel.id, collector);
    },
    collectors,
}