# tinker-whois 

A WHOIS query plugin for TINKER, supporting domain, IP address, and ASN lookups.

## Features

- 🌐 **Domain Query**: Query WHOIS information for various top-level domains (TLDs)
- 📍 **IP Address Query**: Support for IPv4 and IPv6 address lookups
- 🔢 **ASN Query**: Support for Autonomous System Number queries
- ⚡ **Fast Response**: Direct TCP-based WHOIS queries, no intermediate server required
- 🎨 **Modern Interface**: Clean and beautiful user interface

## Supported Query Types

### Domains
- Generic TLDs: .com, .net, .org, .edu, .gov, etc.
- Country code TLDs: .cn, .uk, .jp, .de, .fr, etc.
- New gTLDs: .io, .ai, .app, .dev, .blog, etc.

### IP Addresses
- IPv4 addresses (e.g., 8.8.8.8)
- IPv6 addresses

### ASN
- Autonomous System Numbers (e.g., AS15169)

## Usage

1. Enter a domain, IP address, or ASN in the input box
2. Click the "Query" button or press Enter
3. View the WHOIS query results

## Example Queries

- `google.com` - Query Google domain information
- `github.com` - Query GitHub domain information
- `8.8.8.8` - Query Google DNS server information
- `AS15169` - Query Google's ASN information

## Technical Details

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Electron Preload Script
- **Protocol**: WHOIS TCP (port 43)
- **Reference**: [whois-main](https://github.com/KincaidYang/whois)

## Development

```bash
# Install dependencies
npm install

# Development mode
npm run dev

# Build
npm run build
```

## Debugging

Tinker supports global plugins (e.g., `npm i -g tinker-whois`). For local development:

```bash
npm link
```

Restart Tinker after `npm link` to load the global plugin.

## Notes

- WHOIS queries use standard TCP protocol, connecting directly to WHOIS servers
- Some WHOIS servers may have rate limiting
- Query timeout is set to 10 seconds
