from auth import getJira
from termcolor import colored

import sys


def delete_last_line():
    "Deletes the last line in the STDOUT"
    # cursor up one line
    sys.stdout.write("\x1b[1A")
    # delete last line
    sys.stdout.write("\x1b[2K")


delete_lines = lambda n: [delete_last_line() for _ in range(n)]


# def selectIssue(issues: list[Issue], length: int):
#     selectedIndex = 0
#     selectedIssue = None
#     while not selectedIssue:
#         # print("Select an issue:")
#         try:
#             newChar = getch.getch()
#         except OverflowError:
#             continue
#         handleChar(newChar)


def getJQLForIssue(search: str):
    split = search.split("-")
    project, id = len(split) == 2 and split or (split[0], "")
    paddedId = id.ljust(4, "0")
    return f"project = {project} and key >= {project}-{paddedId}"


def searchForIssue(jira: JIRA, search: str):
    jql = getJQLForIssue(search)
    print(jql)
    issues = jira.search_issues(jql, maxResults=10)
    return issues


def isBackspace(char: str):
    return ord(char) == 127

def handleChar(char: str):
    order = ord(char)
    print("order", order)

def printIssues(
    issues: list[Issue] | None, selectedIndex: int = -1, clearLength: int = 10
):
    if issues is None:
        return
    delete_lines(clearLength)
    for i, issue in enumerate(issues):
        if i == selectedIndex:
            print(colored(f"\t{issue}", "green"))
        else:
            print(f"\t{issue}")
