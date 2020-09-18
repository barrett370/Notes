#!/bin/zsh

sd=$(pwd)
converter="$sd"/md-utils/converter.ts

tsc "$converter"
cd ../Y3 || exit

for D in $(find . -type d); do
  if [[ $D =~ '/source$' ]]; then
    for F in $(find $D -type f); do
      echo "compiling $F"
      node "$converter" -f "$F"
    done
    mv "$D"/*.html "$D"/../out/
  fi

done
