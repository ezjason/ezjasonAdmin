#!/usr/bin/env node
const yargs = require ('yargs');
const cli = yargs
  .command(
    'upload', '上传服务', (yargs) => {

    }, (argv) => {
      require('./upload/cos.js')()
    }).option('help', {
    alias: 'h',
    describe: '显示帮助'
  }).option('version', {
      alias: 'v',
      describe: '显示版本号'
    }
  ).argv;
