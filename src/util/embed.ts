import {Message, MessageEmbed} from "discord.js";

export default class Embed {
    static base() : MessageEmbed {
        const embed = new MessageEmbed()
        embed.setColor('BLUE')
        return embed
    }

    static msg(msg: Message) {
        const embed = this.base()
        embed.setFooter(msg.author.tag, msg.author.displayAvatarURL({dynamic: true}))
        embed.setTimestamp(Date.now())
        return this.base()
    }
}