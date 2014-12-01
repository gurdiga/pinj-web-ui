clean-build:
	@ls -1 --directory build/* | \
	grep --extended-regexp --invert-match '(CNAME|README.md|node_modules|test)$$' | \
	xargs rm -rf
