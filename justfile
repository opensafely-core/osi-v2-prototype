# list available commands
default:
    @"{{ just_executable() }}" --list


# *args is variadic, 0 or more. This allows us to do `just test -k match`, for example.
# Run the tests
test *args: devenv
    echo "Not implemented yet"


# runs the format (black), sort (isort) and lint (flake8) check but does not change any files
check: devenv
    echo "Not implemented yet"


# fix formatting and import sort ordering
fix: devenv
    echo "Not implemented yet"


# Run the dev project
run: devenv
    python -m http.server



# Remove built assets and collected static files
assets-clean:
    rm -rf assets/dist


# Install the Node.js dependencies
assets-install:
    #!/usr/bin/env bash
    set -eu

    # exit if lock file has not changed since we installed them. -nt == "newer than",
    # but we negate with || to avoid error exit code
    test package-lock.json -nt node_modules/.written || exit 0

    npm ci
    touch node_modules/.written


# Build the Node.js assets
assets-build:
    #!/usr/bin/env bash
    set -eu

    # find files which are newer than dist/.written in the src directory. grep
    # will exit with 1 if there are no files in the result.  We negate this
    # with || to avoid error exit code
    # we wrap the find in an if in case dist/.written is missing so we don't
    # trigger a failure prematurely
    if test -f assets/dist/.written; then
        find assets/src -type f -newer assets/dist/.written | grep -q . || exit 0
    fi

    npm run build
    touch assets/dist/.written


assets: assets-install assets-build


assets-rebuild: assets-clean assets
