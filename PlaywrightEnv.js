const NodeEnvironment = require('jest-environment-node');
const playwright = require('playwright');

const getBrowserInstance = async browser => {
    return await playwright[browser].launch()
}

const getContext = async browserInstance => {
    return await browserInstance.newContext()
}

const getPage = async context => {
    return await context.newPage()
}

class CustomEnvironment extends NodeEnvironment {
    constructor(config, context) {
        super(config, context);
        this._config = config
    }

    // async handleTestEvent(event) {
    //     console.log(state)
    // }

    async setup() {
        await super.setup();
        this.global.browserInstance = await getBrowserInstance(this._config.browser);
        const context = await getContext(this.global.browserInstance);
        this.global.page = await getPage(context);
    }

    async teardown() {
        await super.teardown();
        if (this.global) {
            await this.global.page.close()
            await this.global.browserInstance.close()
        }
    }

    runScript(script) {
        return super.runScript(script);
    }
}

module.exports = CustomEnvironment;
