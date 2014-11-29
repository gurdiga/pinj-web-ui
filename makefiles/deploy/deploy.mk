deploy: \
	assert-source-tree-clean \
	compile \
	remove-symlinks \
	push-to-gh-pages \
	clean \
	restore-symlinks

assert-source-tree-clean:
	@git status | grep -q 'nothing to commit, working directory clean' || \
	( \
		echo "\n---- Git not clean ----\n\n" && \
		git status && \
		exit 1 \
	)

remove-symlinks:
	find build/ -maxdepth 1 -type l -delete

push-to-gh-pages:
	git add --force -- build && \
	git commit --no-verify --message="build" -- build && \
	git push --force origin `git subtree split --prefix build master`:gh-pages && \
	git reset --hard HEAD~1

restore-symlinks: prepare-symlinks
