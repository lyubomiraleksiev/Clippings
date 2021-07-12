import { Config } from "protractor";
import { join } from 'path';
import * as fs from 'fs-extra';
import htmlReporter from 'cucumber-html-reporter';
import { sleep } from "../support/timeHelper";

let baseConfig: Config = {
    baseUrl: 'https://clippings.com/search?next=%2F&hierarchicalMenu%5BcategoryList.lvl0%5D=Lighting%2FLight%20Bulbs&page=1',

    restartBrowserBetweenTests: true,

    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            w3c: false,
            prefs: {
                download: {
                    prompt_for_download: false,
                    directory_upgrade: true,
                    default_directory:  join(process.cwd() + '/download'),
                }
            },
            args: [
                "--test-type=browser",
                "headless",
                "window-size=1500,1500",
		        "--no-sandbox"
            ],
        },
    },

    framework: "custom",
    frameworkPath: require.resolve("protractor-cucumber-framework"),

    specs: [
        "../../features/*.feature",
    ],

    suites: {
        all: '../../features/*.feature',
        min_max: '../../features/min-max-filters.feature'
    },

    onPrepare: async () => {
        // Create directories for reporting
        fs.ensureDirSync(join(process.cwd(), '/reports'));
        fs.ensureDirSync(join(process.cwd(), '/reports/json'));
        fs.ensureDirSync(join(process.cwd(), '/reports/html'));
    },

    onCleanUp: async (exitCode: number) => {
        htmlReporter.generate(config.params.reports.htmlReporterOptions);
        await sleep(1000);
    },

    params: {
        // set
        cucumberSetDefaultTimeout: 75000,
        waitTimeout: 75000,

        reports: {
            // specifies if the html report should be sent as an email attachment
            attachReport: false,

            // options object for the cucumber-html-reporter
            htmlReporterOptions: {
                // Values are taken from jsonReportPath and htmlReportPath
                jsonFile: join(process.cwd(), '/reports/json/cucumber_report.json'),
                output: join(process.cwd(), '/reports/html/cucumber_report.html'),
                screenshotsDirectory: undefined,

                theme: 'bootstrap',
                reportSuiteAsScenarios: true,
                launchReport: true,
            },
        }
    },

    cucumberOpts: {
        compiler: "ts:ts-node/register",
        format: ["json:./reports/json/cucumber_report.json", require.resolve("cucumber-pretty")],
        require: ["../../bin/stepdefinitions/*.js", "../../bin/support/*.js"],
        strict: true,
        tags: "",
        retry: 0
    },

    createDBEntry: false,
};

export let config: Config = baseConfig;