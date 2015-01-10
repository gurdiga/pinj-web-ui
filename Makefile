export
	HTTP_PORT=3000

default: lint prepare-build clean-build restart

pre-commit: default

include $(shell find makefiles -name '*.mk' | sort)
