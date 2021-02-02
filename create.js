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
    fs.writeFile(`configs/${client}-${server}.conf`, result, function (err) {
      if (err) return console.log(err)
    })
  }
}
