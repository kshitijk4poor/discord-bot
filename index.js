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
    member => !member.user.bot && member.lastMessage.channel.id === channelID
  );
  if (members.size > 0) {
    const memberArray = Array.from(members.values());
    const randomMember = memberArray[Math.floor(Math.random() * memberArray.length)];
    const targetChannel = await client.channels.fetch(targetChannelID);
    await targetChannel.send(`Congratulations to <@${randomMember.id}> for being selected randomly!`);
  }
}

client.login(process.env.BOT_TOKEN);
console.log('bot is online');