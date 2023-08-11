import Mustache from 'mustache'
Mustache.escape = (text) => text
import { x25519 } from '@noble/curves/ed25519';
import { Buffer } from 'buffer'
import fs from 'fs'
import path from 'path'

const clientTemplate = fs.readFileSync(path.join("./template/client.mst"), "utf8")
const serverTemplate = fs.readFileSync(path.join("./template/server.mst"), "utf8")
const clients = JSON.parse(fs.readFileSync(path.join("./template/clients.json"), "utf8"))
const servers = JSON.parse(fs.readFileSync(path.join("./template/servers.json"), "utf8"))

const Uint8ArrayToBase64 = (u8a) => Buffer.from(u8a).toString('base64')
const deriveKeypair = (privateKey) => Uint8ArrayToBase64(x25519.scalarMultBase(privateKey))

// create directories if DNE
if (!fs.existsSync('clients')) fs.mkdirSync('clients')
if (!fs.existsSync('servers')) fs.mkdirSync('servers')

// start iterating through servers
for (let server in servers) {
  let editedClients = [] // array of clients with public keys and names as properties
  // iterate through clients
  for (let client in clients) {
    const clientObj = clients[client]
    let clientResult = Mustache.render(clientTemplate, {...servers[server], ...clientObj})
    const dir = `clients/${client}`
    if (!fs.existsSync(dir)) fs.mkdirSync(dir)
    fs.writeFileSync(`clients/${client}/${server}.conf`, clientResult.replace(/\n\n/g, '\n'))
    clientObj.publickey = deriveKeypair(Buffer.from(clientObj.privatekey, 'base64'))
    clientObj.name = client
    editedClients.push(clientObj)
  }
  // write server config without header
  let serverResult = Mustache.render(serverTemplate, { "clients": editedClients })
  fs.writeFileSync(`servers/${server}.conf`, serverResult.replace(/\n\n/g, '\n'))
}
