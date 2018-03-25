import fs from 'fs';// Useful to interact with the file system
import cheerio from 'cheerio'; // Handy way to interact with the DOM using jQuery selectors
import colors from 'colors';

/* eslint-disable no-console */

fs.readFile('src/index.html', 'utf8', (err, markup) => {
  if(err) {
    return console.log(err);
  }

  const $ = cheerio.load(markup);// Load the DOM in memory

  $('head').prepend('<link rel="stylesheet" href="/style.css">');

  fs.writeFile('dist/index.html', $.html(), 'utf8', function(err) {
    if(err) {
      return console.log(err);
    }
    console.log('index.html written to /dist folder'.green);
  });
});
