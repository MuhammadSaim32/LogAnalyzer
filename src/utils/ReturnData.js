import fs from "fs"

const IP_REGEX = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g
const METHOD_REGEX = /\b(GET|POST|PUT|DELETE|PATCH|HEAD|OPTIONS)\b/
const TIMESTAMP_REGEX = /\b(\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?|\d{2}\/\w{3}\/\d{4}:\d{2}:\d{2}:\d{2} [+-]\d{4}|\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{1,2} \d{4} \d{2}:\d{2}:\d{2}|\d{2}-(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-\d{4}|1[0-9]{12}|1[0-9]{9})\b/g
const STATUS_REGEX = /\b([1-5]\d{2})\b/
const ENDPOINT_REGEX = /\b(GET|POST|PUT|DELETE|PATCH|HEAD|OPTIONS) (\/[^\s]*)/
const RESPONSE_TIME_REGEX = /\b\d+(?:\.\d+)?(?:ms|s)\b|\b(?:rt|time|response_time)=\d+(?:\.\d+)?\b/i
const USER_AGENT_REGEX = /"(Mozilla\/.*?)"/
const REFERER_REGEX = /"(https?:\/\/[^"]+)"/

export default function ReturnData(filePath) {

    const status = {}
    const headers = []
    const values = []
    const data = fs.readFileSync(filePath, "utf-8")
        .split('\n')
        .map((val) => val.trim())
        .filter((val) => val !== '')
    const ActualMalformLines = []
    let MalformedLinesCount = 0;
    let LineThatCrashed = []
    let prevLIne = null;
    for (let val of data) {
        const ip = val.match(IP_REGEX)
        const metod = val.match(METHOD_REGEX)
        const time = val.match(TIMESTAMP_REGEX)
        const endpint = val.match(ENDPOINT_REGEX)
        const status = val.match(STATUS_REGEX)
        const responseTime = val.match(RESPONSE_TIME_REGEX)
        const userAgent = val.match(USER_AGENT_REGEX)
        const referer = val.match(REFERER_REGEX)

        if (ip && !headers.includes("IP")) {
            headers.push("IP")
        }

        if (metod && !headers.includes("METHOD")) {
            headers.push("METHOD")
        }

        if (time && !headers.includes("TIME")) {
            headers.push("TIME")
        }

        if (endpint && !headers.includes("ENDPOINT")) {
            headers.push("ENDPOINT")
        }

        if (status && !headers.includes("STATUS")) {
            headers.push("STATUS")
        }

        if (responseTime && !headers.includes("RESPONSE_TIME")) {
            headers.push("RESPONSE_TIME")
        }

        if (userAgent && !headers.includes("USER_AGENT")) {
            headers.push("USER_AGENT")
        }

        if (referer && !headers.includes("REFERER")) {
            headers.push("REFERER")
        }

        let ans = {
            ...(ip && { "IP": ip[0] }),
            ...(metod && { "METHOD": metod[0] }),
            ...(time && { "TIME": time[0] }),
            ...(status && { "STATUS": status[0] }),
            ...(endpint && { "ENDPOINT": endpint[2] || endpint[0] }),
            ...(responseTime && { "RESPONSE_TIME": responseTime[0] }),
            ...(userAgent && { "USER_AGENT": userAgent[0] }),
            ...(referer && { "REFERER": referer[0] }),
        }

        if (Object.keys(ans).length > 0) {

            values.push(ans)
            prevLIne = ans
        } else {
            const isStackTraceLine = val.startsWith('at ') || val.includes('.java:') || val.includes('.py", line');
            const containsErrorKeyword = val.toLowerCase().includes('error:') || val.toLowerCase().includes('exception:');
            const isRawExceptionName = val.endsWith('Exception') || val.includes('Error: ') || val.includes('panic:');
            if (isStackTraceLine || containsErrorKeyword || isRawExceptionName) {
                if (prevLIne != null) {
                    let obj = { ...prevLIne }
                    obj.line = val
                    LineThatCrashed.push(obj)
                    prevLIne = null
                } else {
                    LineThatCrashed[LineThatCrashed.length - 1].line += val
                }

            }

            MalformedLinesCount++;
            ActualMalformLines.push(val)
        }
    }


    status.MalformedLinesCount = MalformedLinesCount
    status.TotalRequests = values.length
    status.ActualMalformLines = ActualMalformLines
    status.LineThatCrashed = LineThatCrashed
    return [headers, values, status, LineThatCrashed]
}