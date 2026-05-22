import ReturnData from "../utils/ReturnData.js";
import chalk from 'chalk';
import showBanner from "../utils/Banner.js";

function printStyledSummary(stats) {
    showBanner()
    console.log("\n\n")
    console.log('\n' + chalk.cyan.bold('=================================================='));
    console.log(chalk.cyan.bold('       Summary Of Logs          '));
    console.log(chalk.cyan.bold('==================================================\n'));

    // --- SECTION 1: INGESTION METRICS ---
    console.log(chalk.yellow.bold('[+] LOG STREAM INTEGRITY'));
    console.log(chalk.gray('--------------------------------------------------'));
    console.log(`${chalk.white('Total Processed Lines :')} ${chalk.green(stats.TotalRequests + stats.MalformedLinesCount)}`);
    console.log(`${chalk.white('Valid Log Requests    :')} ${chalk.green(stats.TotalRequests)}`);
    console.log(`${chalk.white('Malformed/Bad Lines   :')} ${stats.MalformedLinesCount > 0 ? chalk.red.bold(stats.MalformedLinesCount) : chalk.green(0)}`);
    console.log(`${chalk.white('Unique Client IPs     :')} ${chalk.blue.bold(stats.TotalNumberOfUniqeIPs)}`);

    // --- SECTION 2: STATUS CODE BUCKETS ---
    console.log('\n' + chalk.yellow.bold('[+] RESPONSE STATUS DISTRIBUTION'));
    console.log(chalk.gray('--------------------------------------------------'));

    // Dynamically pull from your ResponseStatus object
    const status = stats.ResponseStatus;
    console.log(`${chalk.blue('1xx Informational :')} ${chalk.white(status['1xx'] || 0)}`);
    console.log(`${chalk.green('2xx Success       :')} ${chalk.white(status['2xx'] || 0)}`);
    console.log(`${chalk.magenta('3xx Redirection   :')} ${chalk.white(status['3xx'] || 0)}`);
    console.log(`${chalk.yellow('4xx Client Error  :')} ${status['4xx'] > 0 ? chalk.yellow.bold(status['4xx']) : chalk.white(0)}`);
    console.log(`${chalk.red('5xx Server Error  :')} ${status['5xx'] > 0 ? chalk.red.bold(status['5xx']) : chalk.white(0)}`);

    // --- SECTION 3: MALFORMED LINES ---
    if (stats.ActualMalformLines && stats.ActualMalformLines.length > 0) {
        console.log('\n' + chalk.red.bold('[!] MALFORMED LINE'));
        console.log(chalk.gray('--------------------------------------------------'));

        stats.ActualMalformLines.forEach((line, index) => {
            console.log(chalk.red(`  ${index + 1}. `) + chalk.gray(`"${line}"`));
        });
    }

    console.log('\n' + chalk.cyan.bold('==================================================\n'));
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