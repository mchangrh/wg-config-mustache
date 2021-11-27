# wg-config-mustache
generate client configuration files for Wireguard[®](https://www.wireguard.com/) with Mustache.js (like a VPN company)

## Usage
- Populate `template/client.mst`
  - Include any static options like `KeepAlive` or `MTU`
  - Options are in [Unofficial Documentation](https://github.com/pirate/wireguard-docs#Config-Reference)
- Populate `template/servers.json` with your servers - `dns` is optional.
- Populate `template/clients.json` with your clients - `psk` is optional.
- run `npm start`

## Rationale
there are a lot of wireguard configuration managers out there, from webui to client-only to web-only. However, none of them allow for multiple clients connecting to multiple servers that are not behind the same endpoint (like a pseudo VPN company).

I have generated vanity addresses for all my clients and intend to use them across all my servers. However, not all my servers have the same port, public key or are IPv4 only.