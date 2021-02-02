# wg-config-mustache
generates client configuration files for wireguard with Mustache.js (like a VPN company)

## Usage
1. Change `template/client.mst` if you have any static options like `KeepAlive` or `MTU` - Options are in [Unofficial Documentation](https://github.com/pirate/wireguard-docs#Config-Reference)
2. Populate `template/servers.json` with your servers - `dns` is optional.
3. Populate `template/clients.json` with your clients - `psk` is optional.
4. run `node create.js`

## Rationale
there are a lot of wireguard configuration managers out there, from webui to client-only to web-only. However, none of them allow for multiple clients connecting to multiple servers that are not behind the same endpoint (like a pseudo VPN company).

I have generated vanity addresses for all my clients and intend to use them across all my servers. However, not all my servers have the same port, public key or are IPv4 only.