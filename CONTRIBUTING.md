# Contributing

There are a lot of features in homebridge-assistant-ui that need to be developed.
We welcome pull requests and feature suggestions from everyone.

This project is written in [TypeScript](https://www.typescriptlang.org/) and uses [Nest.js](https://nestjs.com/), using [Nest.js](https://nestjs.com/) for the server side and [React]( https://reactjs.org/) for the client UI.
The 3D avatars are rendered using VRM, three.js and @pixiv/three-vrm.

## Getting Setup

1. If you already have ``homebridege-assistant-ui`` installed globally, delete it from your development machine.

```
npm uninstall -g homebridge-assistant-ui
```

2. Fork, then clone the repo

``` git clone
git clone git@github.com:your-username/homebridge-assistant-ui.git
``` 

3. Install npm dependencies

```
npm install
npm run install:ui
```

4. Build the plugin, it may take sometime to compile the UI

```
npm run build
```

5. Symlink your development directory to global

```
npm link
```

## Watching For Changes

This will start the development build server on port 4200. It will also watch for changes on the server side and compile.

```
npm run watch
```
