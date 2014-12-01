define deploy-build
	$(eval remote=$(strip $(1)))
	$(eval host=$(strip $(2)))

	$(eval directory="build")

	echo $(host) > $(directory)/CNAME && \
	git add --force -- $(directory) && \
	git commit --no-verify --message="build" -- $(directory) && \
	git push --force $(remote) $$(git subtree split --prefix $(directory) master):gh-pages && \
	git reset --hard HEAD~1
endef
