import { AkairoClient } from "discord-akairo";

class ChinoClient extends AkairoClient {
    constructor() {
        super({
            disableMentions: "everyone",
            presence: {
                status: 'idle',
                activity: {
                    name: ''
                }
            }
        });
    }
}

export default ChinoClient
