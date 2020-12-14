import {Command} from "discord-akairo";
import {Message} from "discord.js";

export default class extends Command {
    constructor() {
        super('owner__reload', {
            aliases: ['리로드', 'reload', 'rl', 'ㄹㄹㄷ']
        });
    }

    exec(msg: Message, args: any): any {
        Object.keys(require.cache).filter(r=>!r.includes('node_modules')).map(it => delete require.cache[it])
        this.client._commandHandler.categories.forEach(it => it.removeAll())
        this.client._listenerHandler.categories.forEach(it => it.removeAll())
        this.client._inhibitorHandler.categories.forEach(it => it.removeAll())
        this.client._commandHandler.loadAll()
        this.client._listenerHandler.loadAll()
        this.client._inhibitorHandler.loadAll()
        return msg.react('✅')
    }
}