git-save:
	git add . && git commit -m "npm: patched"
	
publish: git-save
	npm version patch
	sleep 1
	npm publish