lint:
	@echo "Linting..."
	@find makefiles/ src/ -name '*.coffee' | xargs coffeelint --file makefiles/lint/coffeelint.json --quiet
