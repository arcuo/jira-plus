import argparse
import os
import stat

from auth import authParser
from mainParser import mainParser

username = os.getenv("SUDO_USER")
home = os.path.expanduser("~" + (username if username else ""))

# TODO: Make filepath dynamic
bashFile = f"{home}/Repos/jira-plus/jira-plus-cli/jp.sh"
fishConfigCompletionsDir = f"{home}/.config/fish/completions/jp.fish"
userLocalBinDir = "/usr/local/bin/jp"
requirementsFile = f"{home}/Repos/jira-plus/jira-plus-cli/requirements.txt"


def writeFishCompletions():
    print("Registering fish auto completions in ~/.config/fish/completions/jp.fish")

    top = getCompletionsTop()
    authCompletions = getCommandCompletions(authParser)

    with open(fishConfigCompletionsDir, "w") as f:
        for line in top + authCompletions:
            f.write(line + "\n")
        f.close()


def getCompletionsTop():
    lines = []

    commands = " ".join(mainParser._actions[-1].choices)

    lines += ["# List of main sub commands", f"set -l mainCommands {commands}", ""]
    lines += ["# File completions need to be disabled", "complete -c jp -f", ""]

    return lines


def getCommandCompletions(commandParser: argparse.ArgumentParser):
    commandName = commandParser.prog.replace("jp ", "")
    commandDescription = commandParser.description
    mainCommands = " ".join(mainParser._actions[-1].choices)

    lines = [
        f"# Completions for '{commandName}' command",
        f"complete -c jp -n 'not __fish_seen_subcommand_from {mainCommands}' -a {commandName} -d '{commandDescription}'",
        "",
    ]

    lines += [
        f"complete -c jp -n '__fish_seen_subcommand_from {commandName}' -a '--{action.dest}' -d '{action.help}'"
        for action in commandParser._actions
        if action.dest != "help"
    ]
    lines += [f"complete -c jp -n '__fish_seen_subcommand_from {commandName}' -a '--help' -d 'Show help message for {commandName} command'"]

    return lines + [""]


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
    writeFishCompletions()


install()
