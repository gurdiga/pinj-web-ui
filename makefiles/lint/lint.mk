lint:
	@echo "Linting..."
	@find makefiles/common app/ test/ -name '*.coffee' | xargs coffeelint --file makefiles/lint/coffeelint.json --quiet
