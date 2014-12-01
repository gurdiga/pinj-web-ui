PRODUCTION_HOST_NAME=new-pinj.pentru.md
PRODUCTION_GIT_REMOTE=origin

production: \
	assert-git-clean \
	prepare-build \
	delete-build-symlinks \
	deploy-production \
	clean-build \
	create-build-symlinks

deploy-production:
	$(call deploy-build, $(PRODUCTION_GIT_REMOTE), $(PRODUCTION_HOST_NAME))
