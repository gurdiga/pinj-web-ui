LINT_FILES=$(shell find makefiles/common app/ test/ -name '*.js')
lint:
	@echo "Linting..."
	@jshint -c makefiles/lint/jshintrc.json $(LINT_FILES) && touch makefiles/lint/jshintrc.json
