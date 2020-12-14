import { AkairoClient } from "discord-akairo";
import config from '../../../config.json'
import {Message, Team, User} from "discord.js";
import Dokdo from "dokdo";

class ChinoClient extends AkairoClient {
    _dokdo?: Dokdo

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
