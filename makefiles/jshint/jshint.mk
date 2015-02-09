JSHINT_FILES=$(shell find makefiles/common app/ test/ -name '*.js')

jshint: lintspaces
	@echo "Linting..."
	@jshint -c makefiles/jshint/jshintrc.json $(JSHINT_FILES)

lintspaces:
	@lintspaces \
		--newline \
		--maxnewlines 2 \
		--trailingspaces \
		--indentation spaces \
		$(JSHINT_FILES)
