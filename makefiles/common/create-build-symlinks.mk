create-build-symlinks:
	@ln \
		--verbose \
		--force \
		--symbolic \
		--target-directory=build \
		../node_modules \
		../test
