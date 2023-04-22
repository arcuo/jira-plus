import argparse
import os
import pathlib
import shutil
import sys

from auth import auth, authParser

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
  --fish_completions  Register auto completions for fish
        """
    )
    quit()


mainParser.print_help = print_help

mainParser.add_argument("--fish-completions", action="store_true")
mainParser.add_argument(
    "-h",
    "--help",
    action="help",
    help="Show this help message and exit",
    default=argparse.SUPPRESS,
)
mainParser.add_argument("command", choices=["auth"], nargs="?")

try:
    mainArgs = sys.argv[1:2]
    commandArgs = sys.argv[2:]

    if len(mainArgs) == 0:
        mainParser.print_help()
        quit()

    try:
        args = mainParser.parse_args(mainArgs)
    except argparse.ArgumentError:
        mainParser.print_help()
        quit()

    if args.fish_completions:
        print("Registering fish auto completions in ~/.config/fish/completions/jp.fish")
        home = os.path.expanduser('~')
        shutil.copy(
            pathlib.Path(
                f"{home}/Repos/jira-plus/jira-plus-cli/completions.fish"
            ),
            f"{home}/.config/fish/completions/jp.fish",
        )

        quit()

    if args.command == "auth":
        auth(commandArgs)


except KeyboardInterrupt:
    print("\nExiting")
