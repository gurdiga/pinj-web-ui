deps: install-npm-packages install-bower-packages mount-app

install-npm-packages:
	ln --force --symbolic makefiles/deps/package.json && \
	npm prune && \
	npm install

install-bower-packages:
	ln --force --symbolic makefiles/deps/bower.json && \
	bower prune && \
	bower install && \
	cp --verbose bower_components/pure/pure-nr-min.css app/pages/common/css/pure-nr-min.scss

mount-app:
	ln --force --symbolic --target=node_modules ../app
