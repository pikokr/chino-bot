import {Listener} from "discord-akairo";

export default class extends Listener {
    constructor() {
        super('client__ready', {
            category: 'client',
            event: 'ready',
            emitter: 'client'
        });
    }

    exec(): any {
        if (!this.client.shard) {
            process.exit()
            return
        }
        console.log(`Shard #${this.client.shard.ids.reduce((acc,cur)=>acc+cur)} Ready.`)
    }
}