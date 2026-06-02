import { c as createComponent } from './astro-component_h1JPBcyL.mjs';
import 'piccolore';
import { h as addAttribute, o as renderHead, p as renderSlot, k as renderTemplate, m as maybeRenderHead, q as renderComponent } from './entrypoint_Ptr2DFxW.mjs';
import 'clsx';

const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  const SITE_NAME = "Rimcourt";
  const { title, description, canonical, ogImage = "/og-default.png" } = Astro2.props;
  const canonicalURL = canonical ?? new URL(Astro2.url.pathname, Astro2.site).href;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} · ${SITE_NAME}`;
  const ogImageURL = new URL(ogImage, Astro2.site).href;
  return renderTemplate`<html lang="it"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${fullTitle}</title><meta name="description"${addAttribute(description, "content")}><link rel="canonical"${addAttribute(canonicalURL, "href")}><meta property="og:type" content="website"><meta property="og:site_name"${addAttribute(SITE_NAME, "content")}><meta property="og:title"${addAttribute(fullTitle, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:url"${addAttribute(canonicalURL, "content")}><meta property="og:image"${addAttribute(ogImageURL, "content")}><meta property="og:locale" content="it_IT"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(fullTitle, "content")}><meta name="twitter:description"${addAttribute(description, "content")}><meta name="twitter:image"${addAttribute(ogImageURL, "content")}>${renderHead()}</head> <body class="min-h-screen bg-neutral-950 text-neutral-100 antialiased"> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/Users/matteo/rimcourt/src/layouts/Layout.astro", void 0);

const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Header;
  const nav = [
    { label: "Game", href: "/partite" },
    { label: "Stats", href: "/statistiche" },
    { label: "Drama", href: "/drama" }
  ];
  const { pathname } = Astro2.url;
  const isActive = (href) => href === "/" ? pathname === "/" : pathname.startsWith(href);
  return renderTemplate`${maybeRenderHead()}<header class="sticky top-0 z-50 bg-black border-b border-neutral-900"> <div class="mx-auto flex max-w-3xl items-center gap-6 px-4 py-3"> <!-- Logo --> <a href="/" class="flex items-center gap-2 shrink-0" aria-label="Rimcourt, vai alla home"> <svg viewBox="0 0 24 24" class="h-7 w-7" aria-hidden="true"> <circle cx="12" cy="12" r="10" fill="none" stroke="white" stroke-width="1.5"></circle> <g stroke="white" stroke-width="1.2" fill="none" stroke-linecap="round"> <line x1="12" y1="2" x2="12" y2="22"></line> <path d="M12 2c-4 4-4 16 0 20"></path> <path d="M12 2c4 4 4 16 0 20"></path> <line x1="2.4" y1="9" x2="21.6" y2="9"></line> <line x1="2.4" y1="15" x2="21.6" y2="15"></line> </g> </svg> <span class="text-sm font-bold tracking-widest uppercase">Rimcourt</span> </a> <!-- Nav --> <nav class="hidden items-center gap-6 md:flex flex-1" aria-label="Navigazione principale"> ${nav.map((item) => {
    const active = isActive(item.href);
    return renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(active ? "page" : void 0, "aria-current")}${addAttribute(`text-sm transition-colors hover:text-white ${active ? "text-white" : "text-neutral-400"}`, "class")}> ${item.label} </a>`;
  })} </nav> <!-- Destra: cerchio + Newsletter --> <div class="flex items-center gap-3 ml-auto"> <div class="h-7 w-7 rounded-full bg-neutral-700" aria-hidden="true"></div> <div class="h-4 w-px bg-neutral-700" aria-hidden="true"></div> <a href="/newsletter" class="rounded-md border border-neutral-600 px-3 py-1.5 text-xs font-medium text-neutral-100 transition-colors hover:border-neutral-400 hover:bg-neutral-900">
Newsletter
</a> </div> </div> </header>`;
}, "/Users/matteo/rimcourt/src/components/Header.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const now = /* @__PURE__ */ new Date();
  const formatter = new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Rome" });
  const oggiIT = formatter.format(now);
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() + i);
    dates.push(formatter.format(d));
  }
  const datesQuery = dates.map((d) => `dates[]=${d}`).join("&");
  let partite = [];
  let erroreAPI = false;
  try {
    const res = await fetch(
      `https://api.balldontlie.io/v1/games?${datesQuery}&per_page=100`,
      { headers: { Authorization: "175903fc-d987-4d72-977d-6cf088d33e9b" } }
    );
    if (res.ok) {
      const json = await res.json();
      partite = (json.data ?? []).sort(
        (a, b) => new Date(a.datetime ?? a.status).getTime() - new Date(b.datetime ?? b.status).getTime()
      );
    } else {
      erroreAPI = true;
    }
  } catch {
    erroreAPI = true;
  }
  function oraIT(game) {
    if (game.status === "Final") return "Final";
    if (game.period > 0) return `Q${game.period}${game.time ? " " + game.time : ""}`;
    const raw = game.datetime ?? game.status;
    if (!raw) return "–";
    const d = new Date(raw);
    if (isNaN(d.getTime())) return raw;
    return d.toLocaleTimeString("it-IT", {
      timeZone: "Europe/Rome",
      hour: "2-digit",
      minute: "2-digit"
    });
  }
  function dataIT(game) {
    const raw = game.datetime ?? game.status;
    if (!raw) return oggiIT;
    const d = new Date(raw);
    if (isNaN(d.getTime())) return oggiIT;
    return formatter.format(d);
  }
  function labelData(dateStr) {
    const d = /* @__PURE__ */ new Date(dateStr + "T12:00:00");
    if (dateStr === oggiIT) return "Oggi";
    const domani = formatter.format(new Date(now.getTime() + 864e5));
    if (dateStr === domani) return "Domani";
    return d.toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" });
  }
  const partiteOggi = partite.filter((p) => dataIT(p) === oggiIT);
  const perData = /* @__PURE__ */ new Map();
  for (const p of partite) {
    const k = dataIT(p);
    if (!perData.has(k)) perData.set(k, []);
    perData.get(k).push(p);
  }
  const cluster = [
    { label: "Dove vedere", href: "/dove-vedere" },
    { label: "Recap & analisi", href: "/recap" },
    { label: "Guide", href: "/guide" },
    { label: "Squadre & giocatori", href: "/squadre" }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Rimcourt — NBA in italiano", "description": "Partite NBA di stasera, dove vederle in Italia, recap e analisi in italiano." }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<main class="mx-auto max-w-3xl px-4 py-6 space-y-3"> <!-- Partite del giorno --> <section aria-labelledby="partite-title" class="rounded-lg border border-blue-500 bg-neutral-800 p-4"> <div class="flex items-center justify-between mb-3"> <h2 id="partite-title" class="text-sm font-medium text-white">Partite del giorno</h2> <a href="/partite" class="text-xs text-orange-400 hover:text-orange-300 transition-colors">Tutte →</a> </div> ${erroreAPI ? renderTemplate`<p class="text-xs text-neutral-500">Dati non disponibili.</p>` : partiteOggi.length === 0 ? renderTemplate`<p class="text-xs text-neutral-500">Nessuna partita oggi.</p>` : renderTemplate`<div class="grid grid-cols-2 gap-2 sm:grid-cols-3"> ${partiteOggi.map((p) => renderTemplate`<div class="rounded bg-neutral-700 px-3 py-2 text-xs text-neutral-200"> <span class="font-semibold">${p.home_team.abbreviation} – ${p.visitor_team.abbreviation}</span> <span class="ml-2 text-neutral-400">${oraIT(p)}</span> </div>`)} </div>`} </section> <!-- Stasera in NBA --> <section aria-labelledby="stasera-title" class="rounded-lg bg-neutral-800 p-4"> <div class="flex items-center justify-between mb-3"> <h2 id="stasera-title" class="text-sm font-medium text-white">Stasera in NBA</h2> <span class="text-xs text-orange-400">Orario Italiano</span> </div> ${erroreAPI ? renderTemplate`<p class="text-xs text-neutral-500">Dati non disponibili.</p>` : partiteOggi.length === 0 ? renderTemplate`<p class="text-xs text-neutral-500">Nessuna partita stasera.</p>` : renderTemplate`<div class="space-y-2"> ${partiteOggi.map((p) => renderTemplate`<div class="flex items-center justify-between rounded bg-neutral-700 px-4 py-3"> <div> <span class="text-sm text-white font-medium"> ${p.home_team.full_name} vs ${p.visitor_team.full_name} </span> <span class="ml-2 text-xs text-neutral-400">${oraIT(p)}</span> </div> <a href="/dove-vedere" class="shrink-0 ml-3 text-xs text-neutral-400 border border-neutral-600 rounded px-2 py-1 hover:text-white hover:border-neutral-400 transition-colors">
Dove vedere ↗
</a> </div>`)} </div>`} </section> <!-- Prossime partite (giorni successivi) --> ${[...perData.entries()].filter(([k]) => k !== oggiIT).map(([data, games]) => renderTemplate`<section${addAttribute(`Partite del ${labelData(data)}`, "aria-label")} class="rounded-lg bg-neutral-900 border border-neutral-800 p-4"> <h2 class="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-3 capitalize"> ${labelData(data)} </h2> <div class="space-y-2"> ${games.map((p) => renderTemplate`<div class="flex items-center justify-between rounded bg-neutral-800 px-4 py-2"> <span class="text-sm text-neutral-300"> ${p.home_team.full_name} vs ${p.visitor_team.full_name} </span> <span class="text-xs text-neutral-500 ml-2">${oraIT(p)}</span> </div>`)} </div> </section>`)} <!-- Recap e analisi --> <section aria-labelledby="recap-title" class="rounded-lg bg-neutral-800 p-4 min-h-[80px]"> <div class="flex items-center justify-between mb-2"> <h2 id="recap-title" class="text-sm font-medium text-white">Recap e analisi</h2> <a href="/recap" class="text-xs text-neutral-500 hover:text-neutral-300 transition-colors">Tutti →</a> </div> <p class="text-xs text-neutral-500">Il recap della notte in italiano — in arrivo.</p> </section> <!-- Esplora --> <section aria-labelledby="esplora-title" class="pt-2"> <h2 id="esplora-title" class="mb-3 text-xs font-bold uppercase tracking-widest text-white">Esplora</h2> <div class="grid grid-cols-2 gap-2"> ${cluster.map((c) => renderTemplate`<a${addAttribute(c.href, "href")} class="rounded-lg bg-neutral-800 px-4 py-10 text-sm font-medium text-neutral-300 transition-colors hover:bg-neutral-700 hover:text-white"> ${c.label} </a>`)} </div> </section> <!-- Ads --> <div class="rounded-lg border border-dashed border-neutral-800 py-8 text-center text-xs text-neutral-700 mt-4" aria-hidden="true">
spazio pubblicitario
</div> <!-- Newsletter --> <section aria-labelledby="newsletter-title" class="flex items-center gap-4 rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-4"> <div class="flex-1"> <h2 id="newsletter-title" class="text-sm font-medium text-white">Partite di stanotte + recap — nella tua inbox</h2> <p class="text-xs text-neutral-500 mt-0.5">Una mail al giorno, solo nei giorni di partita.</p> </div> <a href="/newsletter" class="shrink-0 rounded-md bg-orange-500 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-orange-400">
Iscriviti
</a> </section> </main>  <footer class="mt-8 border-t border-neutral-900 px-4 py-6"> <div class="mx-auto max-w-3xl flex flex-wrap gap-4 text-xs text-neutral-600"> <a href="/squadre" class="hover:text-neutral-300 transition-colors">Squadre</a> <a href="/giocatori" class="hover:text-neutral-300 transition-colors">Giocatori</a> <a href="/guide" class="hover:text-neutral-300 transition-colors">Guide</a> <a href="/dove-vedere" class="hover:text-neutral-300 transition-colors">Dove vedere NBA in Italia</a> <a href="/calendario" class="hover:text-neutral-300 transition-colors">Calendario 2026/27</a> </div> </footer> ` })}`;
}, "/Users/matteo/rimcourt/src/pages/index.astro", void 0);
const $$file = "/Users/matteo/rimcourt/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
