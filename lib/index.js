const url = require('url');

/**
 * Defines if a given a node is internal.
 * @param node
 * @returns {boolean}
 */
const externalLink = (node, showForMail) => {
  if (!node || !node.getAttribute) return false;

  if (node.getAttribute('target') && node.getAttribute('target') !== '_self') return true;

  if (node.getAttribute('rel') === 'external') return true;

  const link = node.getAttribute('href');

  // Set mailto and tel to not return as an external link

  if(showForMail) {
    if (link.match(/^\w+:/)) return true;
  }
  else {
    if (link.match(/^\w+:/)) return false;
  }


  // protocol less
  if (link.match(/^\/\//)) return true;

  return false;
};

/**
 *  Find every link on the page and automatically determine whether an external link icon is needed.
 *  @param options
 *    An object containing options for the link and SVG
 *     title: The title attribute for the link.
 *     ariaLabel: Aria label for the SVG.
 *     exclude: An array of domains to exclude from this function.
 *     target: A target attribute such as '_blank'.
 *     rel: The rel attribute such as 'noopener'.
 *     strokeColor: The icon color to use for the SVG icon.
 *       You will need to use CSS if this option not set.
 *     className: A class to assign to the <a> link.
 * @param options
 */
const extlink = (options = {}) => {
  // Start with defaults.
  const defaults = {
    title: 'External Link Title',
    ariaLabel: 'SVG Aria Label',
    exclude: [],
    target: '_blank',
    rel: 'noopener',
    showForMail: 1,
    strokeColor: '',
    className: '',
  };

  // Merge defaults with given options
  for (const key in defaults) {
    if (typeof options[key] === 'undefined') {
      options[key] = defaults[key];
    }
  }

  // Use default SVG file if one not provided
  if (typeof options.svgfile === 'undefined') {
    // Only add style to SVG file if no stroke provided and assume stroke color is in CSS
    let stroke = '';
    if (options.strokeColor) {
      stroke = `<style>.stroke-color{stroke: ${options.strokeColor};</style>`;
    }
    options.svgfile = `<svg class="svg-icon" aria-label="${options.ariaLabel}" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">${stroke}<g><polyline class="stroke-color" points="9.3,5.4 9.3,9.3 0.7,9.3 0.7,0.7 4.8,0.7 "/><polyline class="stroke-color" points="7,0.7 9.3,0.7 9.3,3.2 "/><line class="stroke-color" x1="9.3" y1="0.7" x2="5.5" y2="4.5"/></g></svg>`;
  }

  // Find all links.
  const links = document.querySelectorAll('a[href]');
  [].forEach.call(links, (link) => {
    // First a simple external check without hard coded url for current site
    if (externalLink(link, options.showForMail)) {
      const href = link.getAttribute('href');
      const domain = url.parse(href).hostname;
      // eslint-disable-next-line comma-spacing
      if (domain && !options.exclude.includes(domain.replace(/www./g,''))) {
        // Only override some attributes if they don't exit
        if (!link.title) {
          link.title = options.title;
        }

        if (!link.target) {
          link.target = options.target;
        }

        if (!link.rel) {
          link.rel = options.rel;
        }

        link.className += ` ${options.className}`;
        link.innerHTML += options.svgfile;
        // Click event listener for custom click behavior.
        link.addEventListener('click', (e) => {
          if (typeof link.dataset.functionname !== 'undefined') {
            // Pass all data attributes to custom callback function.
            window[link.dataset.functionname](options, link.dataset);
            // Prevent normal link behavior if there is a custom callback function.
            e.stopPropagation();
            e.preventDefault();
          }
        }, false);
      }
    }
  });
};

module.exports = extlink;
