default: lint build clean

clean:
	@rm -f build/*.{js,html}

include $(shell find makefiles -name '*.mk' | sort)
