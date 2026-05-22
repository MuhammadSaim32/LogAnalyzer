import ReturnData from "../utils/ReturnData.js"
import Table from 'cli-table3'
import showBanner from "../utils/Banner.js";

const w = process.stdout.columns || 80

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
    let col = []
    let keys = Object.keys(options)

    const wi = 0.10
    col.push(Math.floor(w * 0.10))
    for (let _ of headers) {
        col.push(Math.floor(w * wi))
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


    if (options.line > 0 && options.line <= Values.length) {
        let FilterLIne = Values[options.line - 1]
        let s = [FilterLIne]

        for (let val of s) {
            let row = [options.line]
            for (let h of headers) {

                let anser = val[h] ? val[h] : "-"
                row.push(anser)

            }
            table.push(row)

        }
        showBanner()
        console.log(table.toString())
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


        for (let val of value) {
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


}