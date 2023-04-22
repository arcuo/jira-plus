set -l mainCommands auth

# File completions need to be disabled
complete -c jp -f

# Main file completions
complete -c jp -n 'not __fish_seen_subcommand_from $mainCommands' -a 'auth'