export
	HTTP_PORT=3000

default: lint compile clean

clean:
	@ls -1 --directory build/* | \
	grep --extended-regexp --invert-match '(CNAME|README.md|node_modules|test)$$' | \
	xargs rm --recursive --force

include $(shell find makefiles -name '*.mk' | sort)
