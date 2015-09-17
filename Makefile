MOCHA=./node_modules/.bin/mocha
ISTANBUL=./node_modules/.bin/istanbul
BABEL_ISTANBUL=./node_modules/.bin/babel-istanbul

APP_MOCHA_OPTS=--opts app/test/mocha.opts
MAIN_MOCHA_OPTS=--opts main/test/mocha.opts

APP_FILES=$(shell find app -not -type d | grep -v 'app/coverage')
MAIN_FILES=$(shell find main -not -type d | grep -v 'main/coverage')

default:
	@echo Build

clean:
	rm -rf coverage
	rm -rf app/coverage
	rm -rf main/coverage
	rm -rf dist
	rm -rf release

test: app/test main/test

.PHONY: main/test
main/test:
	${MOCHA} ${MAIN_MOCHA_OPTS}

main/coverage: ${MAIN_FILES}
	${ISTANBUL} cover \
		--include-all-sources \
		-x '**/coverage/**' \
		--root main \
		--dir main/coverage \
		./node_modules/mocha/bin/_mocha \
		-- ${MAIN_MOCHA_OPTS}

.PHONY: app/test
app/test:
	${MOCHA} ${APP_MOCHA_OPTS}

app/coverage: ${APP_FILES}
	${BABEL_ISTANBUL} cover \
		--include-all-sources \
		-x '**/coverage/**' \
		-i '**/*.js*' \
		--root app \
		--dir app/coverage \
		./node_modules/mocha/bin/_mocha \
		-- ${APP_MOCHA_OPTS}

coverage: app/coverage main/coverage ${APP_FILES} ${MAIN_FILES}
	mkdir -p coverage
	jq -s 'reduce .[] as $$report ({}; . + $$report)' \
		app/coverage/coverage.json \
		main/coverage/coverage.json \
		> coverage/coverage.json
	${BABEL_ISTANBUL} report lcov --include coverage/coverage.json

.PRECIOUS: .git/refs/tags/v%
.git/refs/tags/v%:
ifneq ($(shell git describe --always --dirty | grep -- -dirty),)
	$(error Working tree is dirty, please commit or stash your changes, then try again)
endif
	perl -pi -e's/"version":\s*"[^"]*"/"version": "'$*'"/g;' package.json
	git add package.json
	git commit -m "Release "$*"."
	git tag v$*

RELEASE_TARGETS=\
	release/keepass-menubar_%_linux-x64.tar.gz \
	release/keepass-menubar_%_darwin-x64.tar.gz

.PHONY: release-%
release-%: ${RELEASE_TARGETS}
	@echo "Release $1 done"

dist/bundle.js:
	./node_modules/.bin/webpack \
		--config webpack/webpack.config.production.js \
		--progress \
		--profile \
		--colors

.PRECIOUS: release/keepass-menubar_%_linux-x64
release/keepass-menubar_%_linux-x64: .git/refs/tags/v% dist/bundle.js
	mkdir -p release
	node tools/build.js \
		--platform linux \
		--arch x64 \
		--out release
	mv  release/keepass-menubar-linux-x64 \
		release/keepass-menubar_$*_linux-x64

.PRECIOUS: release/keepass-menubar_%_darwin-x64
release/keepass-menubar_%_darwin-x64: .git/refs/tags/v%  dist/bundle.js
	mkdir -p release
	node tools/build.js \
		--platform darwin \
		--arch x64 \
		--out release
	mv  release/keepass-menubar-darwin-x64 \
		release/keepass-menubar_$*_darwin-x64

.PRECIOUS: %.tar.gz
%.tar.gz: %
	tar -zcf $*.tar.gz $*
