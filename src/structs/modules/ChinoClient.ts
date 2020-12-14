import {AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler} from "discord-akairo";
import config from '../../../config.json'
import {Message, Team, User} from "discord.js";
import Dokdo from "dokdo";
import path from "path";

class ChinoClient extends AkairoClient {
    _dokdo?: Dokdo
    _commandHandler: CommandHandler
    _listerHandler: ListenerHandler
    _inhibitorHandler: InhibitorHandler

    constructor() {
        super({
            disableMentions: "everyone",
            presence: {
                status: 'idle',
                activity: {
                    name: `${config.commandPrefix}도움말`
                }
            }
        });
        this._commandHandler = new CommandHandler(this, {
            directory: path.resolve(path.join(__dirname, '../../commands')),
            prefix: config.commandPrefix
        })
        this._listerHandler = new ListenerHandler(this, {
            directory: path.resolve(path.join(__dirname, '../../listeners')),
        })
        this._inhibitorHandler = new InhibitorHandler(this, {
            directory: path.resolve(path.join(__dirname, '../../inhibitors')),
        })
        this._commandHandler.useInhibitorHandler(this._inhibitorHandler)
        this._listerHandler.setEmitters({
            client: this,
            commandHandler: this._commandHandler,
            listerHandler: this._listerHandler
        })

        this._listerHandler.loadAll()
        this._commandHandler.loadAll()
        this._inhibitorHandler.loadAll()
    }

    async start() {
        await this.login(config.token)
        const app = await this.fetchApplication()
        if (app.owner instanceof Team) {
            this.ownerID = app.owner.members.map(it => it.id)
        } else if (app.owner instanceof User) {
            this.ownerID = [app.owner.id]
        }
        this._dokdo = new Dokdo(this, {
            owners: this.ownerID as string[],
            prefix: config.commandPrefix,
            noPerm(msg: Message): any {
                return msg.react('⛔')
            },
            aliases: [
                'util'
            ]
        })
    }
}

export default ChinoClient
