default: lint build clean

clean:
	@rm -f build/*.{js,html}

deps:
	npm install

include $(shell find makefiles -name '*.mk' | sort)
