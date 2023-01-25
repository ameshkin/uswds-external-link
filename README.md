# External Link Script
A client-side script for automatically detecting external links and adding an SVG icon.

## Installation

1. `npm install --save uswds-external-link`
2. The browser-ready file will be at: `node_modules/extlink/extlink.min.js`

## Usage

Here is an example of usage. IMPORTANT: Place this code at the bottom of the page, just before the closing </body> tag.
```
<script type="text/javascript" src="/path/to/extlink.min.js"></script>
<script type="text/javascript">
  extlink({
    title: 'You are now leaving this agency website.',
    ariaLabel: "Aria label for the SVG file",
    svgfile: '',
    exclude: [],
    target: '_blank',
    rel: 'noopener',
    className: 'usa-link usa-link--external',
    strokeColor: '#122E51',
    showForMail: false
  });
</script>
```

If you use the `svgfile` option to override the SVG, then you will need to provide the aria label and stroke color manually.  The `strokeColor` and `ariaLabel` options will be ignored if the SVG file is overridden.

If you do not provide a hex code for `strokeColor`, then you must use the `.stroke-color` class to apply a color.

## Props

There are no options that are required.  You will need to use css to style your icon if you don't set a stroke color. 

You can manually override options such as `target` and `rel` by putting them in your link.

| Property               | Type     |      Default       | Description                                                            |
|------------------------|----------|:------------------:|------------------------------------------------------------------------|
| `title`      | String   |       `null`       | The title for the `<a>` link                                           |
| `ariaLabel`          | String   |  `External Link`   | The aria label for the SVG Icon                                        |
| `svgfile`          | String   | Default Svg String | The SVG file in the form of a string                                   |
| `exclude`           | Array    |        `[]`        | A list of domains to exclude from this script.                         |
| `target`            | String   |      `_blank`      | The target attribute such as `_blank`                                  |
| `rel`        | String   |     `noopener`     | The rel attribute such as 'noopener'.                                  |
| `className`           | String   |       `null`       | A class to assign to the `<a>` link                                    |
| `strokeColor`   | Hex Code |        `null`        | The stroke color for the SVG Icon                                      |
| `showForMail`       | Boolean  |          `false`          | Setting this flag to true will show an icon for `mailto:` and `tel:` links |


## Styling

The default SVG is a 10 pixel square and may need to be styled depending on your theme.  You can add style to the `svg-icon` class to modify the padding and color.

To change the color of the icon, you can add the `svg-alt` class to the link and then change the stroke color in css.

You should always include the `stroke-color` class for the stroke width.  The color can be set using the options or overridden using css. 
```scss

.svg-icon {
  padding: 0 3px;
  width: 10px;
  height: 10px;
}

.svg-alt {
  .stroke-color {
    stroke: #C6ECFC !important;
  }
}

// always include
.stroke-color {
  // stroke: #004f70;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-miterlimit: 10;
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
3. Animations and hovers
