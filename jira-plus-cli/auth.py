import argparse
import pwinput
import json
from typing import TypedDict
from pathlib import Path

from jira import JIRA, JIRAError
from termcolor import colored

authPath = Path(__file__).parent / "./.auth"


class Auth(TypedDict):
    email: str
    api_token: str
    url: str


def saveAuthentication(auth: Auth):
    with open(authPath, "w") as f:
        f.write(json.dumps(auth))
        f.close()


def fetchAuthentication() -> Auth | None:
    if not Path(authPath).is_file():
        return None
    with open(authPath, "r") as f:
        data: Auth = json.loads(f.read())
        f.close()
        return data


def deleteAuthentication():
    Path(authPath).unlink()


def getJira() -> JIRA | None:
    try:
        auth = fetchAuthentication()
        if auth is None:
            return login()
        
        jira = JIRA(
            auth["url"], basic_auth=(auth["email"], auth["api_token"]), validate=True
        )

        return jira
    except JIRAError:
        print(
            "Could not authenticate with jira. Are you logged in? Log in with 'jp auth'"
        )
        login()

def login(email: str | None = None, api_token: str | None = None):
    print("Login to Jira")
    email = input("Email: ") if not email else email
    api_token = (
        pwinput.pwinput("API Token: ") if not api_token else api_token
    )

    url = "https://uniwise.atlassian.net"
    _url = input(f"URL ({colored(url, 'dark_grey')}): ")

    if _url != "":
        url = _url

    saveAuthentication(
        {
            "email": email,
            "api_token": api_token,
            "url": url,
        }
    )

def printLoggedInUser(jira: JIRA):
    user = jira.user(jira.current_user())
    print(colored("Logged in as: ", "green") + user.displayName)

authParser = argparse.ArgumentParser(
    description="Jira Plus CLI - Authenticate with Jira",
    prog="jp auth",
)

authParser.add_argument("--logout", help="Logout of Jira", action="store_true")
authParser.add_argument(
    "-a",
    "--api-token",
    help="API token to JIRA for authentication to login",
    metavar="API_TOKEN",
)
authParser.add_argument(
    "-e", "--email", help="Email to JIRA for authentication to login", metavar="EMAIL"
)
authParser.add_argument(
    "-u", "--url", help="Url to JIRA space for authentication to login", metavar="EMAIL"
)


def auth(args):
    args = authParser.parse_args(args)

    jira = getJira()

    if jira is not None:
        if args.logout:
            print("Logging out of Jira")
            deleteAuthentication()
            quit()
        else:
            printLoggedInUser(jira)
            quit()
    else:
        login(args.email, args.api_token)
        printLoggedInUser(jira)
