require('util/ttl.js');
require('util/parked_domain.js');
require('util/office365.js');

// Registrar
var REG_NONE = NewRegistrar('none');

// DNS Service Providers
var DSP_CLOUDFLARE = NewDnsProvider('cloudflare.com', {
  "manage_redirects": true
});
var DSP_POWERDNS = NewDnsProvider("powerdns");

/*

DMARC

TXT record
_dmarc
v - Version (only DMARC1)
p - What to do (none/quarantine/reject)
sp - What to do for subdomains (optional, uses p if not defined)
pct - % of emails policy applies to (optional, best is 100)
rua - Where to send aggregate DMARC reports (optional, mailto:example@dmarc.engine)
ruf - Where to send forensic DMARC reports (optional, mailto:example@dmarc.engine)
fo - Specify which forensic samples to get (optional, 0 - SPF and DKIM fail (default)/1 - SPF or DKIM fails (best)/d DKIM fails/S SPF fails)
aspf - Specify strict or relaxed SPF alignment (optional, r - Relaxed (default)/s - Strict (best))
adkim - Specify strict or relaxed DKIM alignment (optional, r - Relaxed (default)/s - Strict (best))
rf - Forensic report format (optional, only one value, afrf (default))
ri - Specify the interval of when reports should be sent (optional, value in seconds, 86400 (default,minimal))

Example:
TXT(
  '_dmarc',
  'v=DMARC1; p=reject; pct=100; rua=mailto:example@dmarc.engine; ruf=mailto:example@dmarc.engine; fo=1; aspf=s; adkim=s',
  hour_ttl
);

var GLOBAL_DMARC_POLICY = TXT(
  '_dmarc',
  'v=DMARC1; p=reject; pct=100; rua=mailto:example@dmarc.report-uri.com; ruf=mailto:example@dmarc.report-uri.com; fo=1; aspf=s; adkim=s',
  hour_ttl
);
*/

var GLOBAL_DMARC_POLICY = DMARC_BUILDER({
  policy: "reject", // What to do (none/quarantine/reject)
  //subdomainPolicy: "quarantine", // What to do for subdomains (optional, uses policy if not defined)
  percent: 100, // % of emails policy applies to (optional, best is 100)
  alignmentSPF: "strict", // Specify strict or relaxed SPF alignment (optional, r - relaxed (default)/s - strict (best))
  alignmentDKIM: "strict", // Specify strict or relaxed DKIM alignment (optional, r - relaxed (default)/s - strict (best))
  rua: [ // Where to send aggregate DMARC reports (optional, mailto:example@dmarc.engine)
    "mailto:4230d79dba9c44ad97d7174553654e92@dmarc-reports.cloudflare.net",
  ],
  ruf: [ // Where to send forensic DMARC reports (optional, mailto:example@dmarc.engine)
    "mailto:peter@blomkvist.xyz",
  ],
  failureOptions: "1", // Specify which forensic samples to get (optional, 0 - SPF and DKIM fail (default)/1 - SPF or DKIM fails (best)/d DKIM fails/S SPF fails)
  reportInterval: "24h", // Specify the interval of when reports should be sent (optional, minimum 24h)
});

// ParkedDomain("example.com", REG_NONE, DNS_CLOUDFLARE)

require('domains/blomkvist_xyz.js');
