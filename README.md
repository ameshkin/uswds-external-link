# External Link Script
A client-side script for automatically detecting external links and adding an SVG icon.

## Installation

1. `npm install --save uswds-external-link`
2. The browser-ready file will be at: `node_modules/extlink/extlink.min.js`

## Usage

Here is an example of usage. IMPORTANT: Place this code at the bottom of the page, just before the closing </body> tag.
```
<script type="text/javascript" src="/path/to/exitscript.min.js"></script>
<script type="text/javascript">
  extlink({
    title: 'You are now leaving this agency website.',
    ariaLabel: "label from page",
    svgfile: '',
    exclude: [],
    target: '_blank',
    rel: 'noopener',
    className: 'usa-link usa-link--alt usa-link--external',
    strokeColor: '#122E51'
  });
</script>
```

If you use the `svgfile` option to override the SVG, then you will need to provide the aria label and stroke color manually.  The `strokeColor` and `ariaLabel` options will be ignored if the SVG file is overridden.

If you do not provide a hex code for `strokeColor`, then you must use the `.stroke-color` class to apply a color.

Details for each option are in the `index.js` file.

## Styling

The default SVG is a 10 pixel square and may need to be styled depending on your theme.  You can add style to the `svg-icon` class to modify the padding and color.

To change the color of the icon, you can add the `svg-alt` class to the link and then change the stroke color in css.

```scss
.svg-icon {
  padding: 0 3px;
  width: 10px;
  height: 10px;
}

.svg-alt {
  .stroke-color {
    stroke: #C6ECFC!important;
  }
}
```

## Callback Function

You can use data attributes on individual links to create a click handler.

The `data-functionname` attribute can be used in link tags to use a custom click handler.  Data can be passed in JSON format using the `data-json` attribute.  Any extra data attributes will also be available in your custom function.

```HTML
<a href="https://data.gov" class="extra-class" data-functionname="test" data-json='{"type": "page", "id": 1, "color": "#FF0000"}' data-extra="more data">
```

The name of the callback function needs to match the `data-functionname` attribute and have two arguments.  The merged set of options and any data attributes from the link.
```JS
function test(options, data) {
  let json = JSON.parse(data.json);
  console.log("json: ",json);
}
```

## Development

Install the project dependencies using yarn or npm.

```
yarn
```

Then edit the lib/index.js file as needed. To compile the library to the user-facing extlink.min.js file, type:

```
yarn build
```

Linting standards are set to airbnb and can be controlled via the .eslintrc.js file.

```
yarn lint
```

## Potential Features

1. Background masking to remove any underline from the icon
2. Testing with jsdom and mocha
2. Custom callback for individual links using a `data-function` attribute
3. Animations and hovers
