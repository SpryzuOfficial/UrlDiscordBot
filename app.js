require('dotenv').config();

const fs = require('fs');

const Pageres = require('pageres');
const {Client, Intents, MessageAttachment} = require('discord.js');

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

client.on('ready', () =>
{
    console.log(client.user.tag);
});

client.on('messageCreate', async(message) =>
{
    const list = message.content.split(' ');
    const command = list[0];
    const args = list.splice(1);

    if(command == '*url')
    {
        let path;

        try 
        {
            await message.channel.send('Loading image...');
            await new Pageres()
                .src(args[0], ['1920x1080'])
                .dest('images')
                .run();

            path = 'images/' + args[0].split('/')[2] + '-1920x1080.png';
            const img = fs.readFileSync(path);

            const attachment = new MessageAttachment(img);

            await message.channel.send({files: [attachment]});
        } 
        catch (error) 
        {
            console.log(error);
        }

        fs.unlinkSync(path);
    }
});

if(process.env.PRODUCTION == 1)
{
    keepAlive();
}

client.login(process.env.TOKEN);