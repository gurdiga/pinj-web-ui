create-build-symlinks:
	@mkdir -p build
	@ln \
		--verbose \
		--force \
		--symbolic \
		--target-directory=build \
		../node_modules \
		../test
