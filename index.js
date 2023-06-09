import dotenv from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const channelID = '1100170161694183427'; //general
const targetChannelID = '1101092357635579944'; //test

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  setInterval(runFunction, 1);
});

async function runFunction() {
  const channel = await client.channels.fetch(channelID);
  const members = channel.members.filter(
    member => {
      const lastMessage = member.lastMessage;
      return lastMessage && !member.user.bot && lastMessage.channel.id === channelID;
    });
    console.log(`Found members: ${members.map(member => member.displayName).join(", ")}`);

  if (members.size > 0) {
    const randomIndex = Math.floor(Math.random() * members.length);
const randomMember = members[randomIndex];
    const targetChannel = await client.channels.fetch(targetChannelID);
    await channel.send('This is a test message!');
    await targetChannel.send(`Congratulations to <@${randomMember.id}> for being selected randomly!`);
  }
}

client.login(process.env.BOT_TOKEN);

console.log('bot is online');
