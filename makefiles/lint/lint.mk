LINT_FILES=$(shell find makefiles/common app/ test/ -name '*.js')

lint: lintspaces
	@echo "Linting..."
	@jshint -c makefiles/lint/jshintrc.json $(LINT_FILES)

lintspaces:
	@lintspaces \
		--newline \
		--maxnewlines 2 \
		--trailingspaces \
		--indentation spaces \
		$(LINT_FILES)
