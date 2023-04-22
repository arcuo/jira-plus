

import argparse
from auth import authParser


mainParser = argparse.ArgumentParser(
    description="Jira Plus CLI - Create branches from Jira projects",
    prog="jp",
    usage="jp [command] [...args]",
    add_help=False,
    exit_on_error=False,
)


def print_help():
    print(
        f"""usage: {mainParser.usage}

{mainParser.description}

commands:
  auth - {authParser.description}

options:
  -h, --help  show this help message and exit
  --install  Install jp
        """
    )
    quit()


mainParser.print_help = print_help

mainParser.add_argument("--install", action="store_true")
mainParser.add_argument(
    "-h",
    "--help",
    action="help",
    help="Show this help message and exit",
    default=argparse.SUPPRESS,
)
mainParser.add_argument("command", choices=["auth"], nargs="?")