D("blomkvist.xyz", REG_NONE, DnsProvider(DSP_CLOUDFLARE),
  DefaultTTL(1),
  GLOBAL_DMARC_POLICY,
  //Office365Records('blomkvist.xyz', 'ms69194623', 'blomkvistxyz'),
  MX('@', 95, "route1.mx.cloudflare.net."),
  MX('@', 1, "route2.mx.cloudflare.net."),
  MX('@', 93, "route3.mx.cloudflare.net."),
 // TXT("_dmarc", "v=DMARC1; p=reject; pct=100; rua=mailto:4230d79dba9c44ad97d7174553654e92@dmarc-reports.cloudflare.net; fo=1; aspf=s; adkim=s"),
  TXT("@", "z954jn6655f0ql9sd7hw3yx78f97lgpw"),
  A("@", "20.82.13.59", CF_PROXY_ON),
  //CNAME("@", "white-desert-005768003.2.azurestaticapps.net.", CF_PROXY_ON),
  CNAME("www", "blomkvist.xyz.", CF_PROXY_ON),
  A("router", "192.168.1.1"),
  CNAME("*", "blomkvist.xyz.", CF_PROXY_ON),
  TXT('@', 'MS=ms69194623'),
 /*M365_BUILDER({
  initialDomain: "notez88gmail.onmicrosoft.com",
}),*/

  SPF_BUILDER({
    label: "@",
    overflow: "_spf%d",
    //raw: "_rawspf",
    //ttl: 1,
    parts: [
      "v=spf1",
      "include:_spf.mx.cloudflare.net", // Cloudflare forwarding
      "-all"
    ],
    flatten: [ ] // Try avoiding flattening
  })
);




