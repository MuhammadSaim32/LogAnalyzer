import { program } from 'commander';
import Show from './commands/show.js';
import Filter from "./commands/filter.js"
import Summary from './commands/summary.js';
import Crash from './commands/crash.js';
import showBanner from './utils/Banner.js';

showBanner();

program
    .name('LogAnalyzer')
    .description('CLI Tool for Logs parsing')
    .version('1.0.0');


program.command('show')
    .description('Show command  will Show Logs In a Clean  Formate')
    .argument('<file>', 'Log File Absolute Path')
    .option("--hide <hide...>", "Hide columns that your not interested in")
    .action((files, options) => {
        Show(files, options)
    });


program.command('filter')
    .description('Apply  Filter Based on Specfied Field')
    .argument('<file>', 'Log File Absolute Path')
    .option('-i, --IP <ip>', 'IP Address')
    .option('-m, --METHOD <method>', 'Method')
    .option('-t, --TIME <time>', 'Time')
    .option('-s, --STATUS <status>', 'Status')
    .option('-r, --RESPONSE_TIME <response-time>', 'Response Time')
    .option('-u, --USER_AGENT <user-agent>', 'User Agent')
    .option('--REFERER <referer>', 'Referer')
    .option('-l ,--line <line>', 'Filter by Line Number')

    .action((file, options) => {
        if (Object.keys(options).length === 0) {
            console.error("❌ Error: You must specify at least one filter option (e.g., --IP, --METHOD, --STATUS).");
            console.log("Example: node index.js filter logs.log --METHOD GET");
            process.exit(1); 
        }
        Filter(file, options)
    });


program.command('summary')
    .description('Summary of All Logs')
    .argument('<file>', 'Log File Absolute Path')
    .action((file, options) => {
        Summary(file, options)
    });

program.command('crash')
    .description('crash Command Will Show Which Specific Request Cause Crash/Errors')
    .argument('<file>', 'Log File Absolute Path')
    .action((file, options) => {
        Crash(file, options)
    });


program.parse()