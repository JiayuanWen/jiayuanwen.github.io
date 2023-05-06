# webxr

An entry point for WebXR tools.


## Packages

First, ensure you have [Node.js](https://nodejs.org/en/download/) installed.

### `webxr-cli`

A command-line tool for creating, testing, and deploying WebXR projects.

#### Usage

To install the CLI tool:

```sh
npm install -g webxr-cli
```

To use:

```sh
webxr
```

### `webxr-agent`

A drop-in JavaScript helper library to handle the user interface and logic for the presentation and navigation of WebXR sites.

#### Usage

See the GitHub project for the [WebXR Agent](https://github.com/webvrrocks/webvr-agent).

To include it in your site, simply include this snippet of code in your HTML (ideally, immediately before the `</head>` or before `</body>`):

```js
<script src="https://agent.webvr.rocks/client.js" async defer></script>
```


## License

[CC0-1.0](LICENSE.md)
