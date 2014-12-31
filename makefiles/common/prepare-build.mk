prepare-build: \
	create-build-directory \
	compile-html \
	compile-js \
	copy-stylesheets \
	copy-static-assets \
	check-404s-locally

create-build-directory:
	mkdir -p build

compile-html:
	@echo "Compipling HTML from templates:"
	@node makefiles/common/page-template-pairs.js | \
	grep --invert-match 'test.html' | \
	while read html_file template; do \
		wget --no-verbose http://localhost:$$HTTP_PORT/$$html_file --output-document=build/$$html_file || exit 1; \
	done

compile-js:
	@echo "Compipling JS bundles:"
	@node makefiles/common/bundle-entry-pairs.js | \
	grep --invert-match 'test.js' | \
	while read bundle entry; do \
		wget --no-verbose http://localhost:$$HTTP_PORT$$bundle --output-document=build$$bundle || exit 1; \
	done

copy-stylesheets:
	@echo "Copying stylesheets:"
	@node makefiles/common/stylesheets.js | \
	grep --invert-match 'pure-nr-min.css' | \
	while read stylesheet; do \
		mkdir -p $$(dirname build$$stylesheet); \
		wget --no-verbose http://localhost:$$HTTP_PORT$$stylesheet --output-document=build$$stylesheet.downloaded || exit 1; \
		mv build$$stylesheet.downloaded build$$stylesheet; \
	done
	
copy-static-assets:
	@echo "Copying assets:"
	@node makefiles/common/static-assets.js | \
	while read destination source; do \
		mkdir -p $$(dirname build$$destination); \
		cp -v $$source build$$destination; \
	done

check-404s-locally:
	@echo "Checking for 404s locally:"
	@node makefiles/common/page-template-pairs.js | \
	grep --invert-match '^test.html ' | \
	while read html_file template; do \
		wget --spider -o /tmp/pinj-404-check.log -e robots=off -r -p http://localhost:$$HTTP_PORT/$$html_file && \
		rm -rf localhost:$$HTTP_PORT && \
		rm /tmp/pinj-404-check.log || \
		( \
			cat /tmp/pinj-404-check.log; \
			exit 1 \
		) \
	done && \
	echo "OK"
