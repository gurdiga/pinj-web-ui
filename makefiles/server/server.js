var express = require('express');
var app = express();

var browserify = require('browserify-middleware');
var glob = require('glob');
var bundles = require('../common/bundle-entry-pairs');
for (var bundle in bundles)
  app.use(bundle, browserify(bundles[bundle]));

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
  return function(req, res) { res.render(template); }
}

var pageTemplatePairs = require('../common/page-template-pairs');
pageTemplatePairs[''] = pageTemplatePairs['index.html'];

for (var htmlFile in pageTemplatePairs)
  app.get("/" + htmlFile, serveTemplate(pageTemplatePairs[htmlFile]))

var staticAssets = require('../common/static-assets');
for (var destination in staticAssets)
  app.get(destination, serveStaticAsset(staticAssets[destination]));

function serveStaticAsset(file) {
  return function(req, res) { res.sendFile(process.cwd() + '/'  + file); }
}

var sassMiddleware = require('node-sass-middleware');
app.use(sassMiddleware({
  includePaths: './',
  src: './app/pages',
  dest: './build',
  outputStyle: 'compressed'
}));

var staticMiddleware = require('express-static');
app.use(staticMiddleware('./build'));

app.listen(process.env.HTTP_PORT, function() {
  console.log('Listening on port', process.env.HTTP_PORT);
});
