---
title: "Project Generator"
order: 1
---
<br/>
<HeroImage src="/assets/ts-defold-create.png" width="602" height="433" />

<Tip>
npm init @ts-defold ./project-name
</Tip>

## Requirements :label:

- __NodeJS version _v14.16.0_ or higher__
  - Known compaitbility issue with [_v16.13.0_ on linux](https://github.com/ts-defold/create/issues/3)
- npm

## Guide :book: 


### Project Structure

***@ts-defold/create*** templates follow this common directory structure

```bash
├─ .eslintrc             # Eslint configured to handle the caveats of tstl & ts-defold
├─ package.json          # NPM package dependencies and metadata
├─ tsconfig.json         # TypeScript compiler configuration for tstl & ts-defold
│
├─ .github/              # Github workflows and automation [optional]
├─ .vscode/              # Settings, extensions, and tasks for Visual Studio Code
│
├─ app/                  # The Defold game project
│  ├─ lualib_bundle.lua  # TypeScript support library
│  ├─ modules/           # Transpiled shared lua modules
│  ├─ scripts/           # Transpiled Defold game scripts (lua)
│
├─ patches/              # patch-package patches to add additional features to tstl
│
├─ src/                  # TypeScript src files [edit these]
│  ├─ modules/           # Shared modules
│  ├─ scripts/           # Defold game scripts
```

### @ts-defold/create init

Initialize a new ***ts-defold*** app at the specified path. This command will use the [tsd-template](https://github.com/ts-defold/tsd-template) to initialize the project by default.

```
npm init @ts-defold [path] [--template] [template-name]
```

`path` - path where the new project will be initialized. This should be either a new or empty directory when creating a project.

`--template` - The template to use to initialize the project with. The `template-name` refers to the shortname of a template that is [hosted on github](https://github.com/topics/ts-defold-template). `i.e. tsd-template-war-battles -> war-battles`

### @ts-defold/create --serve :construction_worker: 

Start a ***ts-defold*** development server to watch for changes and continuously 
compile your `src`.

```
npx @ts-defold/create . [--serve] 
```
`--serve` - Create a development server in the preceding path. This will start a file watcher and iterative compiler service to constantly monitor your project for changes and provide feedback on errors and warnings.

## Steps the CLI Takes

***@ts-defold/create*** is a helper to automate the steps needed when starting a 
new ***ts-defold*** project. These steps can be done manually as well if you prefer 
to fork a template and go from there.

- Create a new project directory 
- Download a template archive from github
- Extract the archive
  - *Clone or fork if you prefer*
- Update the package.json with your unique project info
- Run `npm ci` to initialize the project using exact versions
  - *`npm install` also works :wink:

