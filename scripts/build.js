// if NODE_ENV is other than test, set NODE_ENV to production
if(!process.env.NODE_ENV === 'test') {
  process.env.NODE_ENV = 'production';
}

process.on('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.
require('../config/env');

const chalk = require('chalk');
const fse = require('fs-extra');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const formatWebpackMessages = require('./helper/formatWebpackMessages');

const paths = require('../config/paths');

const webpackCommonConfig = require('../config/webpack.config.common');
const webpackProdConfig = require('../config/webpack.config.prod');
const webpackConfig = webpackMerge(webpackCommonConfig, webpackProdConfig);

function copyPublicFolder() {
  fse.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml,
  });
}

function __build() {
  console.log('Creating an optimized production build...');

  const compiler = webpack(webpackConfig);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err);
      }
      const messages = formatWebpackMessages(stats.toJson({}, true));
      if (messages.errors.length) {
        return reject(new Error(messages.errors.join('\n\n')));
      }
      if (process.env.CI && messages.warnings.length) {
        console.log(
          chalk.yellow(
            '\nTreating warnings as errors because process.env.CI = true.\n' +
              'Most CI servers set it automatically.\n'
          )
        );
        return reject(new Error(messages.warnings.join('\n\n')));
      }
      return resolve({
        stats,
        warnings: messages.warnings,
      });
    });
  });
}

async function build() {
  try {
    // Remove all content but keep the directory so that
    // if you're in it, you don't end up in Trash
    fse.emptyDirSync(paths.appBuild);
    copyPublicFolder();
    const { stats, warnings } = await __build();
    if (warnings.length) {
      console.log(chalk.yellow('Compiled with warnings.\n'));
      console.log(warnings.join('\n\n'));
      console.log('\n\n');
      console.log(`Search for the ${ chalk.underline(chalk.yellow('keywords')) } to learn more about each warning.\n\n`);
      console.log(`To ignore, add ${ chalk.cyan('// eslint-disable-next-line') } to the line before.\n`);
    } else {
      console.log(stats);
      console.log(chalk.green('Compiled successfully.\n'));
    }
  } catch (error) {
    console.log(chalk.red('Failed to compile.\n'));
    console.log((error.message || error) + '\n');
    process.exit(1);
  }
}

build();