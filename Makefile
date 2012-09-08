test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--compilers coffee:coffee-script

coffee:
	@coffee -cw --output lib/ src/

.PHONY: test coffee