import json
from typing import TypedDict
from pathlib import Path

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
