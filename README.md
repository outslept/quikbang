# quikbang

<samp>one search bar. 13,000+ websites. zero friction.</samp>

## what

type `!w quantum physics` → land on wikipedia's quantum physics page
type `!gh svelte` → jump to svelte's github repo
type `!yt lofi` → start youtube search for lofi

no bookmarks. no multiple tabs. just direct intent.

## why

because opening google to search for youtube is stupid.
because navigating through interfaces wastes time.
because your browser should be a teleporter, not a maze.

## how it works

```
your input: !w artificial intelligence
result: https://en.wikipedia.org/wiki/Artificial_intelligence

your input: !gh microsoft/vscode
result: https://github.com/search?utf8=%E2%9C%93&q=microsoft%2Fvscode&type=repositories

your input: regular search terms
result: https://www.google.com/search?q=regular%20search%20terms
```

## browser integration

add this as your default search engine:
```
https://quikbang.vercel.app/search?q=%s
```

now your address bar becomes a command line for the entire web.

## popular commands

<samp>
!w → wikipedia<br>
!yt → youtube<br>
!gh → github<br>
!r → reddit<br>
!a → amazon<br>
!maps → google maps<br>
!tr → google translate<br>
!i → google images<br>
</samp>

## tech stack

<samp>
svelte 5 + typescript + css variables + vercel edge
</samp>

## development

```bash
git clone https://github.com/outslept/quikbang
cd quikbang
npm install
npm run dev
```

## data source

bang commands from duckduckgo's public api.
updated automatically. no maintenance required.

---

<samp>
made with ❤️ by <a href="https://github.com/outslept">outslept</a>
</samp>
