export
	HTTP_PORT=3000
	JS_FILES=$(shell find makefiles/ app/ test/ -not -path $(JSHINT_CONFIG_FILE) \( -name '*.js' -or -name '*.json' \))

default: lint prepare-build clean-build server-restart

pre-commit: default

include $(shell find makefiles -name '*.mk' | sort)
