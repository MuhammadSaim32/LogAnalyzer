import ReturnData from "../utils/ReturnData.js"
import chalk from 'chalk'
import showBanner from "../utils/Banner.js";

const arr = [
    "IP",
    "METHOD",
    "TIME",
    "STATUS",
    "ENDPOINT",
    "RESPONSE_TIME",
    "USER_AGENT",
    "REFERER"
];

export default function Filter(filePath, options) {
    let [headers, Values] = ReturnData(filePath)
    let keys = Object.keys(options)

    if (options.line > 0 && options.line <= Values.length) {
        let FilterLIne = Values[options.line - 1]
        let s = [FilterLIne]

        showBanner()
        for (let val of s) {
            console.log(chalk.cyan.bold(`\n  --- Log Entry #${options.line} ---`));
            for (let h of headers) {
                let anser = val[h] ? val[h] : "-"
                console.log(`    ${chalk.yellow.bold(h)}: ${anser}`);
            }
        }
        console.log("");
        return
    }

    if (options.line <= 0 || options.line > Values.length) {
        console.log("InValid LINe")
        return
    }

    let value = [];
    let count = 1;
    for (let val of keys) {
        val = Values.filter((item) => item[val] == options[val])
        value.push(...val)
    }

    if (value.length > 0) {
        showBanner()
        for (let val of value) {
            console.log(chalk.cyan.bold(`\n  --- Log Entry #${count++} ---`));
            for (let h of headers) {
                let anser = val[h] ? val[h] : "-"
                console.log(`    ${chalk.yellow.bold(h)}: ${anser}`);
            }
        }
        console.log("");
    }
}