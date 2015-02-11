SERVER_LOG_FILE=server.log

server-start: create-build-symlinks
	@DEBUG='*' node makefiles/server/server.js SERVER_LABEL=$$(pwd) &> $(SERVER_LOG_FILE) || cat $(SERVER_LOG_FILE) & disown

server-stop:
	@kill -s TERM $$(pgrep -f "SERVER_LABEL=$$(pwd)")

server-restart: server-stop server-start
