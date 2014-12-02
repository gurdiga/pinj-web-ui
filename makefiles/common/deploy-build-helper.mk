define deploy-build
	$(eval remote=$(strip $(1)))
	$(eval host=$(strip $(2)))

	$(eval revision=$(strip $(3)))
	$(eval revision=$(if $(revision),$(revision),master))

	$(eval directory="build")

	@echo "Deploying $(revision) to $(remote)/$(host):"

	echo $(host) > $(directory)/CNAME && \
	git add --force -- $(directory) && \
	git commit --no-verify --message="build" -- $(directory) && \
	git push --force $(remote) $$(git subtree split --prefix $(directory) $(revision)):gh-pages && \
	git reset --hard HEAD~1
endef
