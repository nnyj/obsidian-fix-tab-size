# obsidian-fix-tab-size

<div align="center">

[![Stars](https://img.shields.io/github/stars/nnyj/obsidian-fix-tab-size?style=for-the-badge&labelColor=555&color=e3b341)](https://github.com/nnyj/obsidian-fix-tab-size/stargazers)
[![Downloads](https://img.shields.io/github/downloads/nnyj/obsidian-fix-tab-size/total?style=for-the-badge&labelColor=555&color=2ea44f)](https://github.com/nnyj/obsidian-fix-tab-size/releases)
[![Latest Release](https://img.shields.io/github/v/release/nnyj/obsidian-fix-tab-size?style=for-the-badge&label=Latest%20Release&labelColor=555&color=3572d6)](https://github.com/nnyj/obsidian-fix-tab-size/releases/latest)
[![Build](https://img.shields.io/github/actions/workflow/status/nnyj/obsidian-fix-tab-size/release.yml?style=for-the-badge&labelColor=555)](https://github.com/nnyj/obsidian-fix-tab-size/actions)

</div>

Fixes Obsidian's list indentation to respect the tab size setting. Obsidian hardcodes 4-space indentation for lists regardless of your configured tab size.

## Install

Download `main.js`, `manifest.json` from [Releases](https://github.com/nnyj/obsidian-fix-tab-size/releases) into `.obsidian/plugins/fix-tab-size/`.

## How it works

Obsidian injects a CodeMirror extension with a hardcoded `value` of 4 spaces for list indentation. The plugin monkey-patches `getDynamicExtensions` on the markdown edit-view prototype to replace that value with your configured `tabSize` when `useTab` is off.

The patch applies once on first `layout-change` after a markdown leaf is open, then calls `updateOptions()` on all open markdown views.

> [!NOTE]
> Targets a 3-level-deep prototype chain in Obsidian internals, may break on Obsidian updates.

## Build

```sh
npm install
npm run build
```
