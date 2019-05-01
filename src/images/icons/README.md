# SVG icons

These svgs can be used as svg symbols.

Please make sure icons added adhere to the following requirements:

 * Has a `<title>` tag
 * Doesn't have a hardcoded fill color (so we can style it with css later)
 * Only consists of filled objects (no outlines)

In order to fix some issues, svgo can be used.

In this folder, run:

    npm install -g svgo
    svgo youricon.svg --config svgo-config.yml
