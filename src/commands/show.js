import ReturnData from "../utils/ReturnData.js"
import Table from 'cli-table3'
import showBanner from "../utils/Banner.js"
const w = process.stdout.columns || 80




export default function Show(filePath, options) {
    let [headers, Values,status] = ReturnData(filePath)
    let col = []

    if (options.hide) {
        options.hide = options.hide.map((h) => h.toUpperCase())
        headers = headers.filter((h) => !options.hide.includes(h))
    }
    const wi = 10
    for (let _ of headers) {
        col.push(wi)
    }

    const table = new Table({
        head: ["#", ...headers,],
        colWidths: col,
        style: {
            head: ['cyan'],
            border: ['gray']
        },
        wordWrap: true
    });

    let count = 1;
    for (let val of Values) {
        let row = [count++]
        for (let h of headers) {

            let anser = val[h] ? val[h] : "-"
            row.push(anser)

        }
        table.push(row)

    }
    showBanner()
    console.log(table.toString())

}