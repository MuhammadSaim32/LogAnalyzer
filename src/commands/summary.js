import ReturnData from "../utils/ReturnData.js";
import chalk from 'chalk';

function printStyledSummary(stats) {

    console.log(chalk.cyan.bold(`\n  --- Summary Of Logs ---`));

    // --- SECTION 1: INGESTION METRICS ---
    console.log(chalk.cyan.bold(`\n  --- Log Stream Integrity ---`));
    console.log(`    ${chalk.yellow.bold('Total Processed Lines')}: ${chalk.green(stats.TotalRequests + stats.MalformedLinesCount)}`);
    console.log(`    ${chalk.yellow.bold('Valid Log Requests')}: ${chalk.green(stats.TotalRequests)}`);
    console.log(`    ${chalk.yellow.bold('Malformed/Bad Lines')}: ${stats.MalformedLinesCount > 0 ? chalk.red.bold(stats.MalformedLinesCount) : chalk.green(0)}`);
    console.log(`    ${chalk.yellow.bold('Unique Client IPs')}: ${chalk.blue.bold(stats.TotalNumberOfUniqeIPs)}`);

    // --- SECTION 2: STATUS CODE BUCKETS ---
    console.log(chalk.cyan.bold(`\n  --- Response Status Distribution ---`));

    const status = stats.ResponseStatus;
    console.log(`    ${chalk.yellow.bold('1xx Informational')}: ${chalk.white(status['1xx'] || 0)}`);
    console.log(`    ${chalk.yellow.bold('2xx Success')}: ${chalk.white(status['2xx'] || 0)}`);
    console.log(`    ${chalk.yellow.bold('3xx Redirection')}: ${chalk.white(status['3xx'] || 0)}`);
    console.log(`    ${chalk.yellow.bold('4xx Client Error')}: ${status['4xx'] > 0 ? chalk.yellow.bold(status['4xx']) : chalk.white(0)}`);
    console.log(`    ${chalk.yellow.bold('5xx Server Error')}: ${status['5xx'] > 0 ? chalk.red.bold(status['5xx']) : chalk.white(0)}`);

    // --- SECTION 3: MALFORMED LINES ---
    if (stats.ActualMalformLines && stats.ActualMalformLines.length > 0) {
        console.log(chalk.red.bold(`\n  --- Malformed Lines ---`));

        stats.ActualMalformLines.forEach((line, index) => {
            console.log(`    ${chalk.yellow.bold(`Line ${index + 1}`)}: ${chalk.gray(`"${line}"`)}`);
        });
    }

    console.log("");
}



export default function Summary(filePath) {
    const [headers, values, status] = ReturnData(filePath)

    const ip = values.filter((val) => val["IP"]).map((val) => val["IP"])
    status.TotalNumberOfUniqeIPs = [...new Set(ip)].length
    const ResponseStatus = values.filter((val) => val["STATUS"]).map((val) => val["STATUS"])

    status.ResponseStatus = {
        "1xx": 0,
        "2xx": 0,
        "3xx": 0,
        "4xx": 0,
        "5xx": 0
    }

    for (let st of ResponseStatus) {
        if (st >= 100 && st < 200) {
            status.ResponseStatus["1xx"]++
        } else if (st >= 200 && st < 300) {
            status.ResponseStatus["2xx"]++
        } else if (st >= 300 && st < 400) {
            status.ResponseStatus["3xx"]++
        } else if (st >= 400 && st < 500) {
            status.ResponseStatus["4xx"]++
        } else {
            status.ResponseStatus["5xx"]++
        }
    }

    printStyledSummary(status)
}