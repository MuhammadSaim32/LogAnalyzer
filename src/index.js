import { program } from 'commander';
import Parse from './commands/parse.js';
program
    .name('LogAnalyzer')
    .description('CLI Tool for Logs parsing')
    .version('1.0.0');


program.command('show')
    .description('Show command  will Show Logs In a Clean Tabel Formate')
    .argument('<file>', 'Log File Absolute Path')
    .action((files) => {
        Parse(files)
    });

program.parse()