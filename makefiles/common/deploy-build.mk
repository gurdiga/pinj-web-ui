define deploy-build
	$(eval environment_name=$(strip $(1)))
	$(eval remote=$(strip $(2)))
	$(eval host=$(strip $(3)))

	$(eval build_directory="build")

	echo $(host) > $(build_directory)/CNAME && \
	git add --force -- $(build_directory) && \
	git commit --no-verify --message="$(environment_name) deploy" -- $(build_directory) && \
	git push --force $(remote) $$(git subtree split -q --prefix $(build_directory) HEAD):gh-pages && \
	git reset --hard HEAD~1
endef
