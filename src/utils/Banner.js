
import chalk from 'chalk';
import figlet from 'figlet';


export default function showBanner() {
    const asciiText = figlet.textSync('Log Analyzer', {
        font: 'Slant',       
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,              
        whitespaceBreak: true
    });

    console.log("\n\n")
    console.log(chalk.gray('=============================================='));
    console.log(chalk.cyan(asciiText));
    console.log(chalk.gray('=============================================='));
    console.log(chalk.yellow('  Log Analyzer & Filter Tool v1.0.0'));
    console.log(chalk.gray('==============================================\n'));
}