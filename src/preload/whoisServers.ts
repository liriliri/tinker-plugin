// TLD to WHOIS server mapping
// Source: https://www.iana.org/domains/root/db
export const TLD_TO_WHOIS_SERVER: Record<string, string> = {
  // Generic TLDs
  com: 'whois.verisign-grs.com',
  net: 'whois.verisign-grs.com',
  org: 'whois.pir.org',
  edu: 'whois.educause.edu',
  gov: 'whois.dotgov.gov',
  mil: 'whois.nic.mil',
  info: 'whois.nic.info',
  biz: 'whois.nic.biz',
  name: 'whois.nic.name',
  mobi: 'whois.nic.mobi',
  asia: 'whois.nic.asia',
  tel: 'whois.nic.tel',
  aero: 'whois.aero',
  arpa: 'whois.iana.org',
  pro: 'whois.nic.pro',
  museum: 'whois.nic.museum',
  coop: 'whois.nic.coop',
  travel: 'whois.nic.travel',
  xxx: 'whois.nic.xxx',
  idv: 'whois.nic.idv',

  // New gTLDs
  blog: 'whois.nic.blog',
  app: 'whois.nic.google',
  dev: 'whois.nic.google',
  page: 'whois.nic.google',
  cloud: 'whois.nic.cloud',
  online: 'whois.nic.online',
  site: 'whois.nic.site',
  tech: 'whois.nic.tech',
  store: 'whois.nic.store',
  web: 'whois.nic.web',
  website: 'whois.nic.website',
  space: 'whois.nic.space',
  live: 'whois.nic.live',
  io: 'whois.nic.io',
  ai: 'whois.nic.ai',
  me: 'whois.nic.me',
  top: 'whois.nic.top',
  xyz: 'whois.nic.xyz',

  // Country code TLDs
  cn: 'whois.cnnic.cn',
  tw: 'whois.twnic.net.tw',
  hk: 'whois.hkirc.hk',
  jp: 'whois.jprs.jp',
  kr: 'whois.kr',
  sg: 'whois.sgnic.sg',
  in: 'whois.registry.in',
  au: 'whois.auda.org.au',
  nz: 'whois.srs.net.nz',
  uk: 'whois.nic.uk',
  de: 'whois.denic.de',
  fr: 'whois.nic.fr',
  it: 'whois.nic.it',
  es: 'whois.nic.es',
  nl: 'whois.domain-registry.nl',
  be: 'whois.dns.be',
  ch: 'whois.nic.ch',
  at: 'whois.nic.at',
  se: 'whois.iis.se',
  no: 'whois.norid.no',
  dk: 'whois.dk-hostmaster.dk',
  fi: 'whois.fi',
  pl: 'whois.dns.pl',
  ru: 'whois.tcinet.ru',
  br: 'whois.registro.br',
  mx: 'whois.mx',
  ca: 'whois.cira.ca',
  us: 'whois.nic.us',

  // IP WHOIS servers
  'whois.arin.net': 'whois.arin.net', // North America
  'whois.ripe.net': 'whois.ripe.net', // Europe, Middle East, Central Asia
  'whois.apnic.net': 'whois.apnic.net', // Asia Pacific
  'whois.lacnic.net': 'whois.lacnic.net', // Latin America
  'whois.afrinic.net': 'whois.afrinic.net', // Africa
}

// Default WHOIS server for IP addresses
export const IP_WHOIS_SERVERS = [
  'whois.arin.net',
  'whois.ripe.net',
  'whois.apnic.net',
  'whois.lacnic.net',
  'whois.afrinic.net',
]
