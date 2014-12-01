export
	HTTP_PORT=3000

default: lint prepare-build clean-build

include $(shell find makefiles -name '*.mk' | sort)
