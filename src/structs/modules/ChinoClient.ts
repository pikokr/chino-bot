import {AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler} from "discord-akairo";
import config from '../../../config.json'
import {Message, Team, User} from "discord.js";
import Dokdo from "dokdo";
import path from "path";
import io from 'socket.io-client'

declare module 'discord.js' {
    interface Client {
        _dokdo?: Dokdo
        _commandHandler: CommandHandler
        _listenerHandler: ListenerHandler
        _inhibitorHandler: InhibitorHandler
        ipc: SocketIOClient.Socket
    }
}

class ChinoClient extends AkairoClient {
    constructor() {
        super({
            disableMentions: "everyone",
            presence: {
                status: 'idle',
                activity: {
                    name: `${config.commandPrefix}도움말`
                }
            },
            restTimeOffset: 0
        });
        this._commandHandler = new CommandHandler(this, {
            directory: path.resolve(path.join(__dirname, '../../commands')),
            prefix: config.commandPrefix,
            automateCategories: true
        })
        this._listenerHandler = new ListenerHandler(this, {
            directory: path.resolve(path.join(__dirname, '../../listeners')),
        })
        this._inhibitorHandler = new InhibitorHandler(this, {
            directory: path.resolve(path.join(__dirname, '../../inhibitors')),
        })
        this._commandHandler.useInhibitorHandler(this._inhibitorHandler)
        this._listenerHandler.setEmitters({
            client: this,
            commandHandler: this._commandHandler,
            listerHandler: this._listenerHandler
        })

        this.ipc = io(config.ipc.url, {
            query: {
                auth: config.ipc.secret
            }
        })

        this.ipc.on('connect', () => {
            console.log('Backend IPC Connected.')
        })

        this._listenerHandler.loadAll()
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
        this.on('message', this._dokdo.run.bind(this._dokdo))
    }
}

export default ChinoClient
