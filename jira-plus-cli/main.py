import argparse
import getpass

from auth import deleteAuthentication, fetchAuthentication, saveAuthentication
from jira import JIRA
from search import searchForIssue, selectIssue
from termcolor import colored

parser = argparse.ArgumentParser(
    description="Jira Plus CLI - Create branches from Jira projects"
)

parser.add_argument("--login", help="Login to Jira", action="store_true")
parser.add_argument("--user", help="Get current user", action="store_true")
parser.add_argument("--logout", help="Login to Jira", action="store_true")
parser.add_argument(
    "-s",
    "--search",
    help="Search for an issue",
    nargs="?",
    type=str,
    metavar="SEARCH",
)

args = parser.parse_args()

auth = fetchAuthentication()

try:
    if args.login or auth is None:
        print("Please login to Jira")
        email = input("Email: ")
        api_token = getpass.getpass("API Token: ")
        url = "https://uniwise.atlassian.net"
        _url = input(f"URL ({colored(url, 'dark_grey')}): ")
        if _url != "":
            url = _url
        auth = {
            "email": email,
            "api_token": api_token,
            "url": url,
        }

        saveAuthentication(
            {
                "email": email,
                "api_token": api_token,
                "url": url,
            }
        )

    elif args.logout:
        print("Logging out of Jira")
        deleteAuthentication()
        quit()

    jira = JIRA(
        server=auth["url"],
        basic_auth=(auth["email"], auth["api_token"]),
        validate=True,
    )

    currentUserId = jira.current_user()
    currentUser = jira.user(currentUserId)

    if args.user or args.login:
        print(f"Logged in to {currentUser}")

    issues = searchForIssue(jira, args.search)
    selectIssue(issues, 10)

except KeyboardInterrupt:
    print("\nExiting")
