---
title: "Quick Start"
order: 0
---

## Prerequisites

1. Install [NodeJS](https://nodejs.org/en/) (14+ recommended, minimal 14.x, ymmv 16.x).
2. Install the [Defold Editor](https://defold.com/download/).

<Info>These commands may require root privileges, depending on your operating
system and configuration.</Info>

## Quick Start

1. Create a new ts-defold project:
   ```bash
   npm init @ts-defold my-indie-hit
   ```
   The wizard will guide you through the project configuration

2. Open the project in your favorite editor
   ```bash
   code ./my-indie-hit
   ```
   <Warning>Visual Studio Code is highly recommended. The template projects come pre-configured with vscode settings and extension recommendations.</Warning>

3. Start the development server
   ```bash
   npm run dev
   ```
   The development server will start a file watcher and tstl compiler to incrementally compile your changes on save.

4. Open the project in the Defold Editor *([installing defold](https://defold.com/manuals/install/))*
   ```bash
   /Applications/Defold.app/Contents/MacOS/Defold ./app/game.project
   # or
   C:\\Users\\me\\Applications\\Defold\\Defold.exe
   # or
   ~/Defold/Defold ./app/game.project
   ```
   The template game project is located at: `./app/game.project`.

## Project Directory Structure

```bash
├─ .eslintrc             # Eslint configured to handle the caveats of tstl & ts-defold
├─ package.json          # NPM package dependencies and metadata
├─ tsconfig.json         # TypeScript compiler configuration for tstl & ts-defold
│
├─ app/                  # The Defold game project
│  ├─ lualib_bundle.lua  # TypeScript support library
│  ├─ modules/           # Transpiled shared lua modules
│  ├─ scripts/           # Transpiled Defold game scripts (lua)
│
├─ src/                  # TypeScript src files [edit these]
│  ├─ modules/           # Shared modules
│  ├─ scripts/           # Defold game scripts
```
