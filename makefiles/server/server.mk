server: create-build-symlinks
	@DEBUG='*' coffee makefiles/server/server.coffee ROOT=$$(pwd) &> server.log & disown

stop:
	@kill $$(pgrep -f "ROOT=$$(pwd)")
