import fs from "fs"
import Table from 'cli-table3'

const w = process.stdout.columns || 80

const table = new Table({
    head: ["#", "Time", "Ip", "Method", "Endpoint", "Status", "Response Time"],
    colWidths: [
        5,                        // #
        Math.floor(w * 0.20),    // Timestamp
        Math.floor(w * 0.15),    // IP
        Math.floor(w * 0.08),    // Method
        Math.floor(w * 0.25),    // Endpoint
        Math.floor(w * 0.08),    // Status
        Math.floor(w * 0.10),    // Response
    ],
    style: {
        head: ['cyan'],
        border: ['gray']
    },
    wordWrap: true
});

export default function Parse(filePath) {
    const data = fs.readFileSync(filePath, "utf-8")
        .split('\n')
        .map((val) => val.trim())
        .filter((val) => val !== '')

    let count = 0
    let wrongLines = []
    for (let val of data) {
        try {
            const parts = val.split(" ")
            if (parts.length < 6) continue
            table.push([++count, parts[0], parts[1], parts[2], parts[3], parts[4], parts[5]])
        } catch (err) {
            continue
        }
    }

    console.log(table.toString())
}