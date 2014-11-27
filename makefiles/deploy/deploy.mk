deploy: assert-tree-clean build push-to-gh-pages clean

assert-tree-clean:
	@git status | grep -q 'nothing to commit, working directory clean' || \
	( \
		echo "\n---- Git not clean ----\n\n" && \
		git status && \
		exit 1 \
	)

push-to-gh-pages:
	git add --force -- build && \
	git commit --no-verify --message="build" -- build && \
	git push --force origin `git subtree split --prefix build master`:gh-pages && \
	git reset --hard HEAD~1
