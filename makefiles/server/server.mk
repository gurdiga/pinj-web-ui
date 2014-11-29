prepare-symlinks:
	@( \
		cd build && \
		ln --verbose --force --symbolic ../node_modules && \
		ln --verbose --force --symbolic ../test \
	)

server: prepare-symlinks
	@DEBUG='*' coffee makefiles/server/server.coffee
