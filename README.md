# Personal Search Router

A Firefox extension that routes address-bar searches with short prefixes.

> **Mozilla Add-ons status:** submitted for Mozilla signing as an unlisted, self-distributed add-on. It is not publicly listed in the Firefox Add-ons store. Once Mozilla signs the release, install the signed `.xpi` through Firefox's **Install Add-on From File** option.

| Input | Destination |
| --- | --- |
| `g neural plasticity` | Google |
| `p best local LLM` | Perplexity |
| `o computational psychiatry` | OpenAlex |
| `c explain predictive processing` | ChatGPT |
| `explain predictive processing` | ChatGPT |


## Install

1. In Firefox, open `about:debugging#/runtime/this-firefox`.
2. Select **Load Temporary Add-on** and choose this folder's `manifest.json`.
3. Accept Firefox's prompt to make **Personal Search Router** the default search engine. If you skip it, set it manually in Firefox Search settings.
4. Search from the address bar using the prefixes above. Edit them from the extension's Options page.

Temporary add-ons are removed when Firefox restarts. For a durable personal install, install the Mozilla-signed `.xpi` from the Add-ons Manager's **Install Add-on From File** option.

## Package for Mozilla signing

Run `./package.ps1` in PowerShell. It creates a standards-compliant `.xpi` archive with portable forward-slash paths. Upload that file to the Mozilla Add-on Developer Hub as an unlisted/self-distributed add-on.

## How it works

Firefox requires an HTTPS URL for extension-provided search engines. This add-on therefore sends address-bar searches to ChatGPT first. Its early-loading router redirects recognized prefixes (`g`, `p`, `o`) before ChatGPT renders. Unprefixed searches and `c` remain on ChatGPT.

That means search text is included in the initial ChatGPT URL even when it is ultimately routed elsewhere. If that privacy tradeoff is unacceptable, use Firefox's keyword search with `route` before a query, or host a minimal private HTTPS redirect endpoint instead.

The extension declares Firefox's `searchTerms` data permission because it reads the address-bar query and redirects it to your selected search destination. It does not send search terms to any service of its own.
