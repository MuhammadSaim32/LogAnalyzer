import ReturnData from "../utils/ReturnData.js"
import chalk from 'chalk'

export default function Show(filePath, options) {
    let [headers, Values, status] = ReturnData(filePath)

    if (options.hide) {
        options.hide = options.hide.map((h) => h.toUpperCase())
        headers = headers.filter((h) => !options.hide.includes(h))
    }


    let count = 1;
    for (let val of Values) {
        console.log(chalk.cyan.bold(`\n  --- Log Entry #${count++} ---`), "\n");
        for (let h of headers) {
            let field = val[h] ? val[h] : "-"
            console.log(`    ${chalk.yellow.bold(h)}: ${field}`);
        }
    }
    console.log("");
}