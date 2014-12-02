deps: install-npm-packages install-bower-packages

install-npm-packages:
	ln --force --symbolic makefiles/deps/package.json && \
	npm prune && \
	npm install

install-bower-packages:
	ln --force --symbolic makefiles/deps/bower.json && \
	bower prune && \
	bower install && \
	cp --verbose bower_components/pure/pure-nr-min.css src/web-ui/pages/common/css/pure-nr-min.scss
