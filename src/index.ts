import {ShardingManager} from 'discord.js'
import * as path from "path";

const file = path.join(__dirname, process.argv0 === 'node' ? 'shard.js' : 'shard.ts')

const manager = new ShardingManager(file)

manager.spawn()
