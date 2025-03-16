const { Client, GatewayIntentBits, PermissionsBitField } = require('discord.js');
const axios = require('axios');
const fs = require('fs');
const csv = require('csv-parser');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildBans
    ]
});
const token = 'DEIN_BOT_TOKEN';
const idsFileUrl = 'https://raw.githubusercontent.com/cymbycode/CleanUpBot/main/Ids.txt';

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async message => {
    if (message.content === '+cleanup' && message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        try {
            const response = await axios.get(idsFileUrl);
            const data = response.data;
            const ids = data.split('\n')
                .map(line => line.trim())
                .filter(line => !line.startsWith('//') && line.length > 0);

            if (ids.length === 0) {
                message.channel.send('No valid IDs found in the file.');
                return;
            }

            message.channel.send(`Starting cleanup for ${ids.length} users...`);

            for (const id of ids) {
                try {
                    const user = await client.users.fetch(id);
                    await message.guild.members.ban(user, { reason: 'Cleanup command issued' });
                    console.log(`Banned user: ${user.tag}`);
                } catch (error) {
                    console.error(`Failed to ban user with ID: ${id}`, error);
                    message.channel.send(`Failed to ban user with ID: ${id}. Check the console for details.`);
                }
                await new Promise(resolve => setTimeout(resolve, 1000));
            }

            message.channel.send('Cleanup complete.');
        } catch (error) {
            console.error('Error fetching or processing the IDs file:', error);
            message.channel.send('Error fetching the IDs file. Check the console for details.');
        }
    }

    if (message.content.startsWith('+importxenonbans') && message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        if (!message.attachments.size) {
            message.channel.send('Bitte eine CSV-Datei anhängen.');
            return;
        }
        
        const attachment = message.attachments.first();
        const filePath = `./${attachment.name}`;
        
        const writer = fs.createWriteStream(filePath);
        const stream = await axios.get(attachment.url, { responseType: 'stream' });
        stream.data.pipe(writer);

        writer.on('finish', async () => {
            const bannedUsers = [];
            fs.createReadStream(filePath)
                .pipe(csv({ separator: ';' }))
                .on('data', row => {
                    const userId = row.user_id?.trim();
                    const reason = row.reason?.trim() || 'Imported from Xenon';
                    if (userId && !isNaN(userId)) {
                        bannedUsers.push({ id: userId, reason });
                    }
                })
                .on('end', async () => {
                    if (bannedUsers.length === 0) {
                        message.channel.send('Keine gültigen IDs gefunden.');
                        return;
                    }
                    
                    message.channel.send(`Importiere ${bannedUsers.length} Xenon-Bans...`);
                    
                    for (const { id, reason } of bannedUsers) {
                        try {
                            const user = await client.users.fetch(id);
                            await message.guild.members.ban(user, { reason });
                            console.log(`Banned user: ${user.tag} (${id})`);
                        } catch (error) {
                            console.error(`Failed to ban user with ID: ${id}`, error);
                            message.channel.send(`Failed to ban user with ID: ${id}. Check the console for details.`);
                        }
                        await new Promise(resolve => setTimeout(resolve, 1000));
                    }

                    message.channel.send('Xenon-Ban-Import abgeschlossen.');
                    fs.unlinkSync(filePath);
                });
        });
    }

    if (message.content === '+unbanall' && message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
        try {
            const bans = await message.guild.bans.fetch();
            if (bans.size === 0) {
                message.reply('Es gibt keine gebannten Benutzer.');
                return;
            }
            
            for (const ban of bans.values()) {
                await message.guild.members.unban(ban.user.id);
            }
            
            message.reply(`Alle ${bans.size} gebannten Benutzer wurden entbannt.`);
        } catch (error) {
            console.error('Fehler beim Entbannen:', error);
            message.reply('Ein Fehler ist aufgetreten.');
        }
    }
});

client.login(token);
