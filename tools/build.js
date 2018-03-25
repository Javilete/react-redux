/* eslint-disable no-console */
import webpack from 'webpack';
import webpackConfig from '../webpack.config.prd';
import colors from 'colors';

process.env.NODE_ENV = 'production';

console.log('Creating minified bundle for PRD using Webpack'.blue);
webpack(webpackConfig).run((err, stats) => {
  if(err) {
    console.log(err.bold.red);
    return 1;
  }

  const jsonStats = stats.toJson();

  if(jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(error.red));
  }

  if(jsonStats.hasWarnings) {
    return jsonStats.errors.map(warning => console.log(warning.yellow));
  }

  console.log(`Webpack stats: ${stats}`);

  console.log('Your app has been compiled in PRD mode and written to dist folder'.green);
  return 0;
});
