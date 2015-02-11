prepare-build: \
	create-build-directory \
	prepare-html \
	prepare-js \
	externalize-js-source-maps \
	prepare-css \
	prepare-static-assets \
	check-404s-locally

create-build-directory:
	mkdir -p build

prepare-html:
	@echo "Preparing HTML:"
	@node makefiles/common/page-template-pairs.js | \
	grep --invert-match 'test' | \
	while read html_file template; do \
		wget --no-verbose http://localhost:$$HTTP_PORT/$$html_file --output-document=build/$$html_file || exit 1; \
	done

prepare-js:
	@echo "Preparing JS:"
	@node makefiles/common/bundle-entry-pairs.js | \
	grep --invert-match 'test' | \
	while read bundle entry; do \
		wget --no-verbose http://localhost:$$HTTP_PORT$$bundle --output-document=build$$bundle || exit 1; \
	done

externalize-js-source-maps:
	@echo "Externalizing JS source maps:"
	@node makefiles/common/bundle-entry-pairs.js | \
	grep --invert-match 'test' | \
	while read bundle entry; do \
		echo $$bundle; \
		exorcist build$$bundle.map < build$$bundle > build$$bundle.clean && mv build$$bundle.clean build$$bundle || exit 1; \
	done;

prepare-css:
	@echo "Preparing CSS:"
	@node makefiles/common/stylesheets.js | \
	grep --invert-match 'pure-nr-min.css' | \
	while read stylesheet; do \
		mkdir -p $$(dirname build$$stylesheet); \
		wget --no-verbose http://localhost:$$HTTP_PORT$$stylesheet --output-document=build$$stylesheet.downloaded || exit 1; \
		mv build$$stylesheet.downloaded build$$stylesheet; \
	done
	
prepare-static-assets:
	@echo "Preparing static assets:"
	@node makefiles/common/static-assets.js | \
	while read destination source; do \
		mkdir -p $$(dirname build$$destination); \
		cp -v $$source build$$destination; \
	done

check-404s-locally:
	@echo "Checking for 404s locally:"
	@node makefiles/common/page-template-pairs.js | \
	grep --invert-match 'test' | \
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
