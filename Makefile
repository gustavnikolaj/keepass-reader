default:
	@echo Build

test: app/test main/test

.PHONY: main/test
main/test:
	./node_modules/.bin/mocha --opts main/test/mocha.opts

.PHONY: app/test
app/test:
	./node_modules/.bin/mocha --opts app/test/mocha.opts
