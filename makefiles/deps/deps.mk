deps:
	@( \
		ln --force --symbolic makefiles/deps/package.json && \
		npm prune && npm install && \
		ln --force --symbolic makefiles/deps/bower.json && \
		bower prune && bower install \
	)
	@cp --verbose bower_components/pure/pure-nr-min.css src/web-ui/pages/common/css/pure-nr-min.scss
