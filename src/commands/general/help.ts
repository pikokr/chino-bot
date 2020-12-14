import {Command} from "discord-akairo";
import {Message} from "discord.js";

export default class extends Command {
    constructor() {
        super('general__help', {
            aliases: ['help', '도움말']
        });
    }

    exec(msg: Message, args: any): any {
        return msg.reply('준비중')
    }
}