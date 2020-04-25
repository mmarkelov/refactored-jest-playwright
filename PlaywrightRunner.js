const JestRunner = require('jest-runner')

const browsers = ['chromium', 'webkit', 'firefox']

const getBrowserTest = (test, browser) => {
    return {...test, context: {...test.context, config: {...test.context.config, browser, displayName: {name: browser, color: 'yellow'}}}}
}

const getTests = (browsers, tests) => {
    let browserTests = []
    browsers.forEach(
        browser => {
            tests.map(test => {
                browserTests = [...browserTests, getBrowserTest(test, browser)]
            })
        })
    return browserTests
}

class PlaywrightRunner extends JestRunner {
    constructor(globalConfig, context) {
        super(globalConfig, context)
        // get browsers from config
    }

    async runTests(tests, watcher, onStart, onResult, onFailure, options) {
        const browserTests = getTests(browsers, tests)

        return await (options.serial
            ? this._createInBandTestRun(browserTests, watcher, onStart, onResult, onFailure)
            : this._createParallelTestRun(
                browserTests,
                watcher,
                onStart,
                onResult,
                onFailure
            ));
    }
}

module.exports = PlaywrightRunner
