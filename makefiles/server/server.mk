server: create-build-symlinks
	@DEBUG='*' node makefiles/server/server.js ROOT=$$(pwd) &> server.log & disown

stop:
	@kill $$(pgrep -f "ROOT=$$(pwd)")

restart: stop server
