build: compile-html compile-js copy-test-helpers
.PHONY: build

compile-html:
	@echo "Compipling HTML from templates:"
	@coffee makefiles/common/page-template-pairs.coffee | \
	while read html_file template; do \
		wget --no-verbose http://localhost:$$HTTP_PORT/$$html_file --output-document=build/$$html_file; \
	done

compile-js:
	@echo "Compipling JS bundles:"
	@coffee makefiles/common/bundle-entry-pairs.coffee | \
	while read bundle entry; do \
		wget --no-verbose http://localhost:$$HTTP_PORT$$bundle --output-document=build$$bundle; \
	done

copy-test-helpers:
	mkdir -p build/test
	cp test/navigation.js build/test
	cp test/iframe-setup.js build/test
