# Personal Search Router

Route Firefox address-bar searches to your preferred research and AI tools with short, memorable prefixes.

## Routes

| Type in Firefox | Opens |
| --- | --- |
| `g neural plasticity` | Google |
| `p best local LLM` | Perplexity |
| `o computational psychiatry` | OpenAlex |
| `c explain predictive processing` | ChatGPT |
| `explain predictive processing` | ChatGPT |

Edit routes any time from the extension's Options page.

## Install

The public Firefox Add-ons listing is being prepared for version 1.0.1. Once published, install directly from:

<https://addons.mozilla.org/firefox/addon/personal-search-router/>

For a signed `.xpi` downloaded outside the store, open Firefox's Add-ons Manager, select the gear icon, then choose **Install Add-on From File**.

## Privacy

Personal Search Router has no backend or analytics. It reads an address-bar query only to apply the selected route in your browser. Your route preferences are stored with Firefox Sync when it is enabled.

Firefox requires an HTTPS URL for extension-provided search engines. Searches first open ChatGPT; recognized `g`, `p`, and `o` prefixes immediately redirect to their chosen destination. This means the initial query is included in the ChatGPT URL even for those routed searches. See the [privacy policy](PRIVACY.md) for details.

## Development

To create an upload-ready package, run this from PowerShell:

```powershell
./package.ps1 -OutputPath personal-search-router-v1.0.1.xpi
```

The script creates a standards-compliant `.xpi` archive with portable paths for Mozilla Add-ons submission.

## Support

Questions or improvements: [open an issue](https://github.com/BoomerRawlings/personal-search-router/issues).
