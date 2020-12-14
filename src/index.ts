import {ShardingManager} from 'discord.js'
import path from "path";
import config from '../config.json'

const file = path.join(__dirname, process.env.DEV ? 'shard.ts' : 'shard.js')

const manager = new ShardingManager(file, {
    execArgv: !process.env.DEV ? [] : ['-r', 'ts-node/register'],
    token: config.token
})

manager.spawn()
