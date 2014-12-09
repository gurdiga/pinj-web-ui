create-build-symlinks:
	@mkdir -p build
	@ln \
		--force \
		--symbolic \
		--target-directory=build \
		../node_modules \
		../test
