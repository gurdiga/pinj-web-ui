export
	HTTP_PORT=3000

default: lint compile clean

clean:
	@ls -1 --directory build/* | grep -E -v '(CNAME|README.md)' | xargs rm -rf

include $(shell find makefiles -name '*.mk' | sort)
