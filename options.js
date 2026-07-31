const defaults = {
  g: "https://www.google.com/search?q={query}",
  p: "https://www.perplexity.ai/search?q={query}",
  o: "https://openalex.org/works?search={query}"
};

const routesField = document.querySelector("#routes");
const status = document.querySelector("#status");

function serialize(routes) {
  return Object.entries(routes).map(([prefix, url]) => `${prefix} = ${url}`).join("\n");
}

function parse(text) {
  const routes = {};
  for (const line of text.split("\n")) {
    if (!line.trim()) continue;
    const match = line.match(/^\s*([^\s=]+)\s*=\s*(https:\/\/\S*\{query\}\S*)\s*$/i);
    if (!match) throw new Error(`Invalid route: ${line}`);
    routes[match[1].toLowerCase()] = match[2];
  }
  return routes;
}

async function restore() {
  const { routes = defaults } = await browser.storage.sync.get("routes");
  routesField.value = serialize(routes);
}

document.querySelector("#save").addEventListener("click", async () => {
  try {
    await browser.storage.sync.set({ routes: parse(routesField.value) });
    status.textContent = "Saved.";
  } catch (error) {
    status.textContent = error.message;
  }
});

restore();
