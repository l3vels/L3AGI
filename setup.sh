#!/bin/bash

git config core.hooksPath .hooks

if [[ "$OSTYPE" != "msys" && "$OSTYPE" != "cygwin" && "$OSTYPE" != "win32" ]]; then
  chmod +x .hooks/commit-msg
fi

echo "Git hooks have been configured!"
