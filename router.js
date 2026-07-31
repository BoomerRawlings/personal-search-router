const DEFAULT_ROUTES = {
  g: "https://www.google.com/search?q={query}",
  p: "https://www.perplexity.ai/search?q={query}",
  o: "https://openalex.org/works?search={query}"
};

function parseSearch(input, routes) {
  const value = input.trim();
  const match = value.match(/^([^\s]+)\s+(.+)$/);
  const prefix = match?.[1].toLowerCase();

  if (prefix === "c") {
    return { route: "c", query: match[2].trim() };
  }

  if (prefix && routes[prefix]) {
    return { route: prefix, query: match[2].trim() };
  }

  return { route: null, query: value };
}

function destination(template, query) {
  return template.replace("{query}", encodeURIComponent(query));
}

async function routeSearch() {
  const url = new URL(location.href);
  const input = url.searchParams.get("q");
  if (!input) return;

  const { routes = DEFAULT_ROUTES } = await browser.storage.sync.get("routes");
  const parsed = parseSearch(input, routes);
  if (!parsed.route) return;

  if (parsed.route === "c") {
    url.searchParams.set("q", parsed.query);
    history.replaceState(null, "", url);
    return;
  }

  location.replace(destination(routes[parsed.route], parsed.query));
}

routeSearch();
