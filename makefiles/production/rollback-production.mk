rollback-production: \
	assert-git-clean \
	checkout-previously-deployed-revision \
	prepare-build \
	delete-build-symlinks \
	deploy-production \
	clean-build \
	create-build-symlinks \
	delete-bad-deploy-tag
	git checkout -

checkout-previously-deployed-revision:
	$(eval previously-deployed-revision=$(shell git tag --list | tail -2 | head -1))
	git checkout $(previously-deployed-revision)

delete-bad-deploy-tag:
	$(eval previously-deployed-revision=$(shell git tag --list | tail -1))
	git tag -d $(previously-deployed-revision)
	git push --tags origin
