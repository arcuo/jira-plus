import argparse
import os
import shutil
import pathlib
import stat

from auth import authParser
from mainParser import mainParser

username = os.getenv("SUDO_USER")
home = os.path.expanduser("~" + (username if username else ""))

# TODO: Make filepath dynamic
bashFile = f"{home}/Repos/jira-plus/jira-plus-cli/jp.sh"
completionsScriptFish = pathlib.Path(
    f"{home}/Repos/jira-plus/jira-plus-cli/completions.fish"
)
fishConfigCompletionsDir = f"{home}/.config/fish/completions/jp.fish"
userLocalBinDir = f"/usr/local/bin/jp"
requirementsFile = f"{home}/Repos/jira-plus/jira-plus-cli/requirements.txt"


def fishCompletions():
    print("Registering fish auto completions in ~/.config/fish/completions/jp.fish")

    shutil.copy(
        completionsScriptFish,
        fishConfigCompletionsDir,
    )

def getMainAutoCompletions():
    lines = []

    lines.append("# List of main sub commands")
    lines.append(f"set -l mainCommands {mainParser._actions[0].choices}")

    lines.append("# File completions need to be disabled", "complete -c jp -f") 

    print(lines)

def getCommandAutoCompletions(parser: argparse.ArgumentParser):
    actionCompletions = [
        f"complete -c jp -n '__fish_seen_subcommand_from {parser.prog.replace('jp ', '')}' -a '--{action.dest}' -n '{action.help}'"
        for action in parser._actions
    ]
    print(actionCompletions)


def installRequirements():
    print("Installing requirements")
    os.system(f"pip3 install -r {requirementsFile}")


def symlink():
    if os.path.exists(userLocalBinDir):
        print("Symlink already exists")
        return
    print("Symlinking jp to /usr/local/bin/jp")
    st = os.stat(bashFile)
    os.chmod(bashFile, st.st_mode | stat.S_IEXEC)
    os.symlink(bashFile, userLocalBinDir)


def uninstall():
    print("Uninstalling jp")
    os.unlink(userLocalBinDir)
    os.remove(fishConfigCompletionsDir)


def install():
    installRequirements()
    symlink()
    fishCompletions()


# install()
# getMainAutoCompletions()
getCommandAutoCompletions(authParser)