# LogAnalyzer

LogAnalyzer is a powerful CLI tool designed to parse, filter, and summarize server log files.

## Installation & Setup

1. Clone the project repository:
   ```bash
   git clone git@github.com:MuhammadSaim32/LogAnalyzer.git
   cd LogAnalyzer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the CLI tool:
   ```bash
   node src/index.js <command> <absolute-path-to-log-file> [options]
   ```

## Commands Overview

LogAnalyzer offers four primary commands to analyze your log files:

### 1. `show`
Displays all the log entries from the specified file in a clean, vertically-padded format that works beautifully on any terminal size.

**Usage:**
```bash
node src/index.js show <file> [options]
```
**Options:**
- `--hide <fields...>`: Hide specific columns you are not interested in (e.g., `--hide USER_AGENT REFERER`).

**Example:**
```bash
node src/index.js show /path/to/log.txt --hide TIME RESPONSE_TIME
```

### 2. `filter`
Filters logs based on specific fields such as IP address, HTTP Method, Status code, and more. Outputs the matched logs in the same readable format.

**Usage:**
```bash
node src/index.js filter <file> [options]
```
**Options:**
- `-i, --IP <ip>`: Filter by IP Address
- `-m, --METHOD <method>`: Filter by HTTP Method (e.g., GET, POST)
- `-t, --TIME <time>`: Filter by Time
- `-s, --STATUS <status>`: Filter by Status Code (e.g., 200, 404, 500)
- `-r, --RESPONSE_TIME <response-time>`: Filter by Response Time
- `-u, --USER_AGENT <user-agent>`: Filter by User Agent
- `--REFERER <referer>`: Filter by Referer
- `-l, --line <line>`: Retrieve a specific log line by its absolute line number

*Note: You must specify at least one filter option when using this command.*

**Example:**
```bash
node src/index.js filter logs.txt --METHOD POST --STATUS 401
```

### 3. `summary`
Generates a comprehensive summary of the log file, providing overall metrics (Total processed, unique IPs), response status (grouped by 1xx, 2xx, 3xx, 4xx, 5xx), and identifying any malformed lines.

**Usage:**
```bash
node src/index.js summary <file>
```

### 4. `crash`
Analyzes the log file to identify critical requests that resulted in 5xx server errors or unhandled exceptions, helping you rapidly pinpoint the root cause of crashes in production.

**Usage:**
```bash
node src/index.js crash <file>
```

## Example Output

When running `node src/index.js show log.txt`:

```text
  --- Log Entry #1 --- 

    IP: 192.168.1.42
    METHOD: GET
    TIME: 2024-03-15T14:23:01Z
    ENDPOINT: /api/users
    STATUS: 192
    RESPONSE_TIME: 142ms
    USER_AGENT: -
    REFERER: -

  --- Log Entry #2 --- 

    IP: 10.0.0.7
    METHOD: POST
    TIME: 2024-03-15T14:23:02Z
    ENDPOINT: /api/login
    STATUS: 401
    RESPONSE_TIME: 89ms
    USER_AGENT: -
    REFERER: -
```
