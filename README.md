# Fix Tab Size

Fixes Obsidian's list indentation to respect the tab size setting. Obsidian hardcodes 4-space indentation for lists regardless of your configured tab size — this plugin patches it to use your actual setting.

## Features

- Applies configured tab size to list indent/unindent
- Works on both desktop and mobile
- No settings, just enable and it works

## Install

Download `main.js`, `manifest.json` from [Releases](https://github.com/nnyj/obsidian-fix-tab-size/releases) into `.obsidian/plugins/fix-tab-size/`.

## Build

```bash
npm install
npm run build
```

## How it works

Obsidian's editor injects a CodeMirror extension with a hardcoded `value` of 4 spaces for list indentation. This plugin monkey-patches `getDynamicExtensions` on the markdown edit view prototype to replace that value with your configured `tabSize` when `useTab` is off.
