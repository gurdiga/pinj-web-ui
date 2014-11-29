lint:
	@echo "Linting..."
	@find makefiles/common src/ -name '*.coffee' | xargs coffeelint --file makefiles/lint/coffeelint.json --quiet
