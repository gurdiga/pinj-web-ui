export
	HTTP_PORT=3000

default: lint compile clean

clean:
	@ls -1 --directory build/* | \
	grep --extended-regexp --invert-match '(CNAME|README.md)' | \
	xargs rm --recursive --force

include $(shell find makefiles -name '*.mk' | sort)
