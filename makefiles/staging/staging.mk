STAGING_HOST_NAME=staging.pinj.pentru.md
STAGING_GIT_REMOTE=staging

staging: \
	assert-git-clean \
	prepare-build \
	delete-build-symlinks \
	deploy-staging \
	test-staging \
	clean-build \
	create-build-symlinks

deploy-staging:
	$(call deploy-build, $(STAGING_GIT_REMOTE), $(STAGING_HOST_NAME))

test-staging:
	@echo "Checking for 404s on stage:"
	sleep 10
	@coffee makefiles/common/page-template-pairs.coffee | \
	grep --invert-match '^test.html ' | \
	while read html_file template; do \
		wget --spider -o /tmp/pinj-404-check.log -e robots=off -r -p http://$$STAGING_HOST_NAME/$$html_file && \
		rm /tmp/pinj-404-check.log || \
		( \
			cat /tmp/pinj-404-check.log; \
			exit 1 \
		) \
	done && \
	echo "OK"
