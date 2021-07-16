const clients = require('./template/clients.json')
const servers = require('./template/servers.json')
let Mustache = require('mustache')
Mustache.escape = (text) => text
const fs = require('fs')
const path = require('path')

const template = fs.readFileSync(path.join(__dirname,"template/client.mst"), "utf8")

for (let server in servers) {
  for (let client in clients) {
    let result = Mustache.render(template, {...servers[server], ...clients[client]})
    const dir = `configs/${client}`
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
    fs.writeFileSync(`configs/${client}/${server}.conf`, result)
  }
}
