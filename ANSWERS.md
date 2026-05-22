# How to run: Give the exact command(s) or steps to run your project on a fresh machine. If anything needs installing, list it.
The installation and setup instructions are detailed in the `Readme.md` file.

# Stack choice: Why did you pick this stack/language/framework for this task? What would have been a worse choice and why?
I picked JavaScript (Node.js) because it is the language I am most proficient in, and I built this as a CLI application. Many server administrators manage servers over SSH and do not have GUI access. I chose a CLI approach so developers can install the package and check the log files directly on the server, rather than building a full-stack web application. A full-stack app would be a worse choice because logs reside on the server; requiring a user to download logs and upload them to a separate GUI dashboard adds unnecessary friction and security concerns.

# One real edge case: Describe one specific edge case your code handles correctly. Point to the file and line number. Explain what would happen without that handling.
A real edge case my app handles is filtering out malformed log lines from the actual output and categorizing them separately. If we did not handle this, malformed data would break the parser, cause exceptions, or appear corrupted in the clean output. (For example, the parser gracefully handles lines like `logs.txt` line `18` without crashing the tool).

# AI usage: List every place you used AI (which tool, what you asked, what it gave you). For at least one of these, describe something you changed about the AI output and why.
I used AI tools including Claude, Antigravity, Gemini, and ChatGPT. I used them to brainstorm UI styling (specifically replacing `cli-table3` with vertically padded `chalk` output), designing the ASCII banner, and getting help with the regex for log parsing. I also used AI to rapidly learn the documentation for building CLI apps with Commander.js. While the AI generated the styled print statements, I integrated and adapted them into my core parsing and filtering logic.

# Honest gap: What's one thing in your submission that isn't good enough, and what would you do to fix it with another day?
There are a few gaps, but the top issue is that I am using synchronous file handling (`fs.readFileSync`), which can be a bottleneck or cause performance issues for very large log files. If I had another day, I would rewrite the file ingestion to use asynchronous streams. Additionally, if I had more experience building TUIs with `blessed`, I would love to build an interactive, `htop`-style terminal dashboard where the user can scroll, filter, and interact with the logs dynamically.
