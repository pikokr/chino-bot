import {ShardingManager} from 'discord.js'
import path from "path";
import config from '../config.json'

const file = path.join(__dirname, process.argv0 === 'node' ? 'shard.js' : 'shard.ts')

const manager = new ShardingManager(file, {
    execArgv: process.argv0 === 'node' ? [] : ['-r', 'ts-node/register'],
    token: config.token
})

manager.spawn()
