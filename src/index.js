import { program } from 'commander';
import Show from './commands/show.js';
import Filter from "./commands/filter.js"
program
    .name('LogAnalyzer')
    .description('CLI Tool for Logs parsing')
    .version('1.0.0');


program.command('show')
    .description('Show command  will Show Logs In a Clean Tabel Formate')
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
        Filter(file, options)
    });
program.parse()