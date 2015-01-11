define deploy-build
	$(eval remote=$(strip $(1)))
	$(eval host=$(strip $(2)))

	$(eval build_directory="build")

	echo $(host) > $(build_directory)/CNAME && \
	git add --force -- $(build_directory) && \
	git commit --no-verify --message="Production deploy" -- $(build_directory) && \
	git push --force $(remote) $$(git subtree split --prefix $(build_directory) HEAD):gh-pages && \
	git reset --hard HEAD~1
endef
