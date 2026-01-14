const { SlashCommandBuilder, MessageCollector } = require('discord.js');
const { collectors } = require('./start');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stops the message collector.'),
    async execute(interaction) {
        // Get the channel where the command was issued
        const channel = interaction.channel;
        // Check if there is a collector for this channel or if collectors is undefined
        if (!collectors || !collectors.has(channel.id)) {
            return await interaction.reply('The bot is not running in this channel.');
        }
        await interaction.reply('https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXJucnh0M3NwbXA0bXVlaHlwM3N0MTRpMWF0am81bjh4ajNibDU5ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fA08i9nPZ0Mw2FdhGl/giphy.gif');
        // Stop the message collector
        const collector = collectors.get(channel.id);
        collector.stop();
        // Remove the collector from the map
        collectors.delete(channel.id);
    },
}