'use strict';

var express = require('express');
var app = express();

var browserify = require('browserify-middleware');
var glob = require('glob');
var bundles = require('../common/bundle-entry-pairs');
var options;
for (var bundle in bundles) {
  options = bundle === '/test/lib.js' ? { debug: false, precompile: true, cache: true } : {};
  app.use(bundle, browserify(bundles[bundle], options));
}

var jade = require('jade');
app.set('views', './');
app.set('view engine', 'jade');
app.engine('jade', jade.__express);
app.locals.pretty = true;
app.locals.testFiles = function() {
  return glob.sync('test/**/*.js').sort(function(a, b) {
    return a.length - b.length;
  });
};

function serveTemplate(template) {
  return function(req, res) { res.render(template); };
}

var pageTemplatePairs = require('../common/page-template-pairs');
pageTemplatePairs[''] = pageTemplatePairs['index.html'];

for (var htmlFile in pageTemplatePairs)
  app.get('/' + htmlFile, serveTemplate(pageTemplatePairs[htmlFile]));

var staticAssets = require('../common/static-assets');
for (var destination in staticAssets)
  app.get(destination, serveStaticAsset(staticAssets[destination]));

function serveStaticAsset(file) {
  return function(req, res) { res.sendFile(process.cwd() + '/'  + file); };
}

var sassMiddleware = require('node-sass-middleware');
var path = require('path');
app.use(sassMiddleware({
  src: path.join(process.cwd(), 'app/pages'),
  dest: path.join(process.cwd(), 'build'),
  outputStyle: 'compressed'
}));

app.use(express.static('./build'));

app.listen(process.env.HTTP_PORT, function() {
  console.log('Listening on port', process.env.HTTP_PORT);
});

process.on('SIGTERM', function() {
  process.exit(0);
});
