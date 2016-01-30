import jsdom from 'jsdom';
import register from 'ignore-styles';

register(['.less', '.css']);

global.document = jsdom.jsdom(`
  <!DOCTYPE html>
  <html>
    <body>
    </body>
  </html>
`);

global.window = global.document.defaultView;

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});
