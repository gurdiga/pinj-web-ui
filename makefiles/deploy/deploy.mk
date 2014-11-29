deploy: assert-source-tree-clean compile push-to-gh-pages clean

assert-source-tree-clean:
	@git status | grep -q 'nothing to commit, working directory clean' || \
	( \
		echo "\n---- Git not clean ----\n\n" && \
		git status && \
		exit 1 \
	)

push-to-gh-pages:
	git add -- build && \
	git commit --no-verify --message="build" -- build && \
	git push --force origin `git subtree split --prefix build master`:gh-pages && \
	git reset --hard HEAD~1
