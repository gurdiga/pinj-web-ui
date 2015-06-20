deps: \
	node_modules/app \
	app/pages/common/js/airbrake-client.js \
	node_modules/bourbon/app/assets/stylesheets/_bourbon.scss \
	app/pages/common/css/pure-nr-min.scss

app/pages/common/js/airbrake-client.js: node_modules | app/pages/common/js
	cp node_modules/airbrake-js/dist/client.js $@

app/pages/common/js:
	mkdir $@

node_modules: package.json
	npm install

package.json:
	ln --force --symbolic makefiles/deps/package.json

app/pages/common/css/pure-nr-min.scss: bower_components
	cp bower_components/pure/pure-nr-min.css $@

bower_components: bower.json
	bower install

bower.json:
	ln --force --symbolic makefiles/deps/bower.json

node_modules/app: | node_modules
	ln --force --symbolic --target=node_modules ../app
