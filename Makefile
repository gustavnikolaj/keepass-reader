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
