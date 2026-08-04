const { SlashCommandBuilder, MessageCollector } = require('discord.js');
const { replacer } = require('../util/message-replacer-collector.js');

const collectors = new Map();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('silentstart')
        .setDescription('Starts the message collector silently.'),
    async execute(interaction) {
        // Get the channel where the command was issued
        const channel = interaction.channel;
        // Check if there is already a collector for this channel
        if (collectors.has(channel.id)) {
            return await interaction.reply({content: 'The bot is already running in this channel.', ephemeral: true});
        }
        // Create a message collector
        const collector = new MessageCollector(channel);
        collector.on('collect', async (message) => replacer(message));
        // Store the collector in the map
        collectors.set(channel.id, collector);
    },
    collectors,
}