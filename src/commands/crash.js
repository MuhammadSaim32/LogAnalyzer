import ReturnData from "../utils/ReturnData.js";
import chalk from "chalk";
import showBanner from "../utils/Banner.js";

export default function Crash(filePath) {
    const [headers, , , LineThatCrashed] = ReturnData(filePath);

    if (!LineThatCrashed || LineThatCrashed.length === 0) {
        showBanner();
        console.log(chalk.green('\n  ✔ No runtime crashes or exceptions identified in this file.\n'));
        return;
    }

    showBanner();
    console.log(chalk.red.bold(`\n  --- Critical Fault Report: Server Crash Root-Causes ---`));

    let count = 1;
    for (let incident of LineThatCrashed) {
        console.log(chalk.cyan.bold(`\n  --- Crash Incident #${count++} ---`));
        
        for (let h of headers) {
            let key = h.toUpperCase();
            let rawValue = incident[h] ? incident[h] : "-";
            let formattedValue = chalk.white(rawValue);

            if (key === 'STATUS') {
                formattedValue = rawValue.startsWith('5') ? chalk.red.bold(rawValue) : chalk.yellow(rawValue);
            } else if (key === 'METHOD') {
                formattedValue = chalk.green.bold(rawValue);
            } else if (key === 'ENDPOINT') {
                formattedValue = chalk.cyan(rawValue);
            }

            console.log(`    ${chalk.yellow.bold(h)}: ${formattedValue}`);
        }

        console.log(chalk.red.bold(`\n  --- Caught Errors ---`));
        
        const rawStackTrace = incident.line || 'Unknown Runtime Stack Trace';
        console.log(`    ${chalk.gray(`"${rawStackTrace}"`)}`);
    }

    console.log("");
}