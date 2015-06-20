export
	HTTP_PORT=3000
	JS_FILES=$(shell \
		find makefiles/ app/ test/ \
		-not -path $(JSHINT_CONFIG_FILE) \
		-not -path app/pages/common/js/airbrake-client.js \
		\( -name '*.js' -or -name '*.json' \) \
	)

default: deps lint prepare-build clean-build server-restart

pre-commit: default

include $(shell find makefiles -name '*.mk' | sort)
