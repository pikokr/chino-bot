import {Command} from "discord-akairo";
import {Message} from "discord.js";
import Embed from "../../util/embed";

const categoryMap = {
    general: '기본',
    ownerOnly: '개발자용'
}

export default class extends Command {
    constructor() {
        super('general__help', {
            aliases: ['도움말', 'help']
        });
    }

    async exec(msg: Message, args: any) {
        const embed = Embed.msg(msg)
        this.client._commandHandler.categories.forEach(it => {
            embed.addField(categoryMap[it.id], it.map(it => it.aliases[0]).map(it => '`' + it + '`').join(', '))
        })
        await msg.channel.send(embed)
    }
}