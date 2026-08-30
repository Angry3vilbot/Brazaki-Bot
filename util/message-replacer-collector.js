export async function replacer(message, channel) {
    // Ignore messages from bots
    if (message.author.bot) return;
    let content = message.content.toLowerCase()
    // Check if the message contains the word "хуй", "пиздец" and/or "говно"
    if (content.includes('пиздец') || content.includes('ху') || content.includes('говно') || content.includes('бро') || content.includes('игра')) {
        // Get the initial content of the message
        let content = message.content;
        let replaced = false;
        // Replace all occurences of "хуй" with "хутор", "говно/хуево" with "понос/поносно", "бро" with "бразак", and "пиздец" with "апофеоз", keeping the original case
        content = content.replace(/бро/gi, (match) => {
            replaced = true;
            return match[0] === 'б' ? 'бразак' : 'Бразак';
        });
        content = content.replace(/хуесос[А-яЁё]*/gi, (match) => {
            replaced = true;
            return match[0] === 'х' ? 'хуторосос' + match.slice(6) : 'Хуторосос' + match.slice(6);
        });
        content = content.replace(/ху[её]в[A-яЁё]+/gi, (match) => {
            replaced = true;
            return match[0] === 'х' ? 'хуторов' + match.slice(4) : 'Хуторов' + match.slice(4);
        });
        content = content.replace(/ху[её]в[A-яЁё]*/gi, (match) => {
            replaced = true;
            return match[0] === 'х' ? 'хуторов' + match.slice(4) : 'Хуторов' + match.slice(4);
        });
        content = content.replace(/ху[её]м[А-яЁё]*/gi, (match) => {
            replaced = true;
            return match[0] === 'х' ? 'хутором' + match.slice(4) : 'Хутором' + match.slice(4);
        });
        content = content.replace(/ху[её][А-яЁё]+/gi, (match) => {
            replaced = true;
            return match[0] === 'х' ? 'хуторо' + match.slice(3) : 'Хуторо' + match.slice(3);
        });
        content = content.replace(/хуя[А-яЁё]*/gi, (match) => {
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
        content = content.replace(/хуй[А-яЁё]*/gi, (match) => {
            replaced = true;
            return match[0] === 'х' ? 'хутор' + match.slice(3) : 'Хутор' + match.slice(3);
        });
        content = content.replace(/пиздец[А-яЁё]*/gi, (match) => {
            replaced = true;
            return match[0] === 'п' ? 'апофеоз' + match.slice(6) : 'Апофеоз' + match.slice(6);
        });
        content = content.replace(/говно[А-яЁё]*/gi, (match) => {
            replaced = true;
            return match[0] === 'г' ? 'понос' + match.slice(5) : 'Понос' + match.slice(5);
        });
        content = content.replace(/говн[А-яЁё]*/gi, (match) => {
            replaced = true;
            return match[0] === 'г' ? 'понос' + match.slice(4) : 'Понос' + match.slice(4);
        });
        content = content.replace(/игра/gi, (match) => {
            replaced = true;
            return match[0] === 'и' ? 'гомза' + match.slice(4) : 'Гомза' + match.slice(4);
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
        await webhook.send({ content: content, username: username, avatarURL: avatarURL, files: Array.from(message.attachments.values()) });
        // Delete the original message
        await message.delete();
        // If the message was a reply, send a reply to the message that was replied to
        if(message.reference && message.reference.type === 0) {
            const repliedMessage = await channel.messages.fetch(message.reference.messageId);
            await repliedMessage.reply("^");
        }
    }
}