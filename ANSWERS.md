# How to run: Give the exact command(s) or steps to run your project on a fresh machine. If anything needs installing, list it.

# Stack choice: Why did you pick this stack/language/framework for this task? What would have been a worse choice and why?
- I picked JavaScript (because it is the language I know) with a CLI app. Many server administrators manage servers over SSH and do not have GUI access. I chose a CLI app where the developer can install the package and check the log file, instead of building it as a full-stack app. A full-stack app would be worse because logs are on the server, so for log parsing the user would have to upload the file or move the file to a specific server where they have GUI access.

# One real edge case: Describe one specific edge case your code handles correctly. Point to the file and line number. Explain what would happen without that handling.
- The real edge case my app handles is that it filters out malformed lines from the actual output and puts them in a separate category. If we do not handle that, they will also appear in the output when we use the app. The file is  `logs.txt` and line number is  `18`.

# AI usage: List every place you used AI (which tool, what you asked, what it gave you). For at least one of these, describe something you changed about the AI output and why.

I used AI tools including Claude, Antigravity, Gemini, and ChatGPT. I used them for UI styling, the banner, and regex help. I also used AI to learn new tools along the way, such as reading documentation for building the CLI app, but the core logic was written by me.

# Honest gap: What's one thing in your submission that isn't good enough, and what would you do to fix it with another day?
There are many gaps in it, but the top issue is that I am using synchronous file handling, which causes a blinking screen for long files. I would fix that if I had another day. Also, if I had experience building a TUI with Blessed, that would be a better approach for this tool, where the user can interact with it like `htop` and other interactive terminal-based apps.
