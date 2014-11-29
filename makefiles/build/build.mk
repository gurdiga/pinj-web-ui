build: compile-html compile-js copy-test-helpers
.PHONY: build

compile-html:
	@echo "Compipling HTML from templates:"
	@coffee makefiles/common/page-template-pairs.coffee | \
	while read html_file template; do \
		echo " - $$template -> build/$$html_file"; \
		jade --path $$template < $$template > build/$$html_file; \
	done

compile-js:
	@echo "Compipling JS bundles:"
	@coffee makefiles/common/bundle-entry-pairs.coffee | \
	while read bundle entry; do \
		echo " - $$entry -> build$$bundle"; \
		browserify -t coffeeify $$entry > build$$bundle; \
	done

copy-test-helpers:
	mkdir -p build/test
	cp test/navigation.js build/test
	cp test/iframe-setup.js build/test
