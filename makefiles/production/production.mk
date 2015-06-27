PRODUCTION_HOST_NAME=pinj.pentru.md
PRODUCTION_GIT_REMOTE=origin

production: \
	assert-git-clean \
	prepare-build \
	delete-build-symlinks \
	deploy-production \
	clean-build \
	create-build-symlinks \
	create-deploy-tag

deploy-production:
	$(call deploy-build, Production, $(PRODUCTION_GIT_REMOTE), $(PRODUCTION_HOST_NAME))

create-deploy-tag:
	git tag "production-deploy-$$(date +%Y%m%d-%H%M)"
	git push --tags origin
