#!/bin/zsh
sd=$(pwd)
tsc "$sd"/converter.ts
cd ../Y3 || exit
CHANGED_MD=$(git diff --name-only HEAD -- | grep '.md')
echo $CHANGED_MD
for D in $(find . -type d); do
  if [[ $D =~ '/source$' ]]; then
    for F in $(find $D -type f); do
      for item in "${CHANGED_MD[@]}"; do
        str1="${F:2}"
        str2="${item#Y3/}"
        [ "$str1" = "$str2" ] && node "$sd"/converter.js -f "$F"
      done
    done
    mv "$D"/*.html "$D"/../out/
  fi

done
