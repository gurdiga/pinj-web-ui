PRODUCTION_HOST_NAME=new-pinj.pentru.md
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
	$(call deploy-build, $(PRODUCTION_GIT_REMOTE), $(PRODUCTION_HOST_NAME))

create-deploy-tag:
	git tag "production-deploy-$$(date +%Y%m%d-%H%M)"
	git push --tags origin

rollback-production: \
	assert-git-clean \
	chekcout-previously-deployed-revision \
	prepare-build \
	delete-build-symlinks \
	deploy-production \
	clean-build \
	create-build-symlinks

chekcout-previously-deployed-revision:
	$(eval previously-deployed-revision=$(shell git tag --list | tail -1))
	git checkout $(previously-deployed-revision)

#git push --force origin $$(git subtree split --prefix build $(previously-deployed-revision)):gh-pages
