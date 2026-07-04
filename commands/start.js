const { SlashCommandBuilder, MessageCollector } = require('discord.js');

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
        await interaction.reply('https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2R6ang5cWlxb2RzY3p2OHNuYmNvdWplb21mYmMyaHF0d21lNW5uOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/a6nevQ68jTRGiu0Dcp/giphy.gif');
        // Create a message collector
        const collector = new MessageCollector(channel);
        collector.on('collect', async (message) => {
            // Ignore messages from bots
            if (message.author.bot) return;
            // Check if the message contains the word "хуй", "пиздец" and/or "говно"
            if (message.content.toLowerCase().includes('пиздец') || message.content.toLowerCase().includes('ху') || message.content.toLowerCase().includes('говно') || message.content.toLowerCase().includes('бро')) {
                // Get the initial content of the message
                let content = message.content;
                let replaced = false;
                // Replace all occurences of "хуй" with "хутор", "говно/хуево" with "понос/поносно", "бро" with "бразак", and "пиздец" with "апофеоз", keeping the original case
                content = content.replace(/бро/gi, (match) => {
                    replaced = true;
                    return match[0] === 'б' ? 'бразак' : 'Бразак';
                });
                content = content.replace(/хуесос[А-я]*/gi, (match) => {
                    replaced = true;
                    return match[0] === 'х' ? 'хуторосос' + match.slice(6) : 'Хуторосос' + match.slice(6);
                });
                content = content.replace(/ху[её]в[A-я]+/gi, (match) => {
                    replaced = true;
                    return match[0] === 'х' ? 'хуторов' + match.slice(4) : 'Хуторов' + match.slice(4);
                });
                content = content.replace(/ху[её]в[A-я]*/gi, (match) => {
                    replaced = true;
                    return match[0] === 'х' ? 'хуторов' + match.slice(4) : 'Хуторов' + match.slice(4);
                });
                content = content.replace(/ху[её]м[А-я]*/gi, (match) => {
                    replaced = true;
                    return match[0] === 'х' ? 'хутором' + match.slice(4) : 'Хутором' + match.slice(4);
                });
                content = content.replace(/ху[её][А-я]+/gi, (match) => {
                    replaced = true;
                    return match[0] === 'х' ? 'хуторо' + match.slice(3) : 'Хуторо' + match.slice(3);
                });
                content = content.replace(/хуя[А-я]*/gi, (match) => {
                    replaced = true;
                    return match[0] === 'х' ? 'хутора' + match.slice(3) : 'Хутора' + match.slice(3);
                });
                content = content.replace(/хуу+й/gi, (match) => {
                    replaced = true;
                    // Count the number of 'у's in the match
                    const uCount = match.match(/у+/i)[0].length;
                    const replacement = match[0] === 'х' ? 'х' + 'у'.repeat(uCount) + 'тор' : 'Х' + 'у'.repeat(uCount) + 'тор';
                    return replacement;
                });
                content = content.replace(/хуй[А-я]*/gi, (match) => {
                    replaced = true;
                    return match[0] === 'х' ? 'хутор' + match.slice(3) : 'Хутор' + match.slice(3);
                });
                content = content.replace(/пиздец[А-я]*/gi, (match) => {
                    replaced = true;
                    return match[0] === 'п' ? 'апофеоз' + match.slice(6) : 'Апофеоз' + match.slice(6);
                });
                content = content.replace(/говно[А-я]*/gi, (match) => {
                    replaced = true;
                    return match[0] === 'г' ? 'понос' + match.slice(5) : 'Понос' + match.slice(5);
                });
                content = content.replace(/говн[А-я]*/gi, (match) => {
                    replaced = true;
                    return match[0] === 'г' ? 'понос' + match.slice(4) : 'Понос' + match.slice(4);
                });
                // If no replacements were made, do nothing
                if (!replaced) return;
                // Get the author's name
                const username = message.member ? message.member.displayName : message.author.username;
                // Get the author's profile picture
                const avatarURL = message.author.displayAvatarURL();
                
                // Get or create a webhook for this channel
                let webhook = await channel.fetchWebhooks().then(webhooks => webhooks.first());
                if (!webhook) {
                    webhook = await channel.createWebhook({ name: 'Message Replacer' });
                }
                
                // Send the modified message using the webhook
                await webhook.send({ content: content, username: username, avatarURL: avatarURL });
                // Delete the original message
                await message.delete();
            }
        });
        // Store the collector in the map
        collectors.set(channel.id, collector);
    },
    collectors,
}