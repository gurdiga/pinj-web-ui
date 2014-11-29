compile: compile-html compile-js copy-static-assets

compile-html:
	@echo "Compipling HTML from templates:"
	@coffee makefiles/common/page-template-pairs.coffee | \
	while read html_file template; do \
		wget --no-verbose http://localhost:$$HTTP_PORT/$$html_file --output-document=build/$$html_file || exit 1; \
	done

compile-js:
	@echo "Compipling JS bundles:"
	@coffee makefiles/common/bundle-entry-pairs.coffee | \
	while read bundle entry; do \
		wget --no-verbose http://localhost:$$HTTP_PORT$$bundle --output-document=build$$bundle || exit 1; \
	done

copy-static-assets:
	@echo "Copying assets:"
	@coffee makefiles/common/static-assets.coffee | \
	grep --invert-match '^test/' | \
	while read destination source; do \
		mkdir -p $$(dirname build$$destination); \
		cp -v $$source build$$destination; \
	done
