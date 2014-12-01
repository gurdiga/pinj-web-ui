assert-git-clean:
	@git status | grep -q 'nothing to commit, working directory clean' || \
	( \
		echo "\n---- Git not clean ----\n\n" && \
		git status && \
		exit 1 \
	)
