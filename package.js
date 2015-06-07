Package.describe({
  name: 'peter:scrapester',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.use(['underscore', 'coffeescript', 'meteorhacks:npm'])
  api.addFiles('scrapester.coffee');
  api.export(['S', 'Scrapester'], 'server');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use(['peter:scrapester', 'underscore']);
  api.addFiles('scrapester-tests.js');
});

Npm.depends({
  "cheerio": "0.19.0",
  "request": "2.57.0",
  "webshot": "0.16.0",
  "phantomjs": "1.9.17",
  "aws-sdk": "2.1.33"
});
