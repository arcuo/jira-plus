import argparse
import os
import sys

from auth import auth
from mainParser import mainParser

home = os.path.expanduser("~")

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

    if args.install:
        print("Installing jp")
        os.system(f"sudo python3 {home}/Repos/jira-plus/jira-plus-cli/install.py")
        quit()

    if args.command == "auth":
        auth(commandArgs)


except KeyboardInterrupt:
    print("\nExiting")
