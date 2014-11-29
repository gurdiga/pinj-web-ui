export
	HTTP_PORT=3000

default: lint build clean

clean:
	@rm -rf build/*.{js,html} build/test

deps:
	npm install

include $(shell find makefiles -name '*.mk' | sort)
