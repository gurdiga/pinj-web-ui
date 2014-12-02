lint:
	@echo "Linting..."
	@find makefiles/common src/ test/ -name '*.coffee' | xargs coffeelint --file makefiles/lint/coffeelint.json --quiet
