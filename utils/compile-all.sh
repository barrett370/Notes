#!/bin/zsh

sd=$(pwd)
tsc "$sd"/converter.ts
echo $sd
cd ../Y3 || exit

for D in $(find . -type d); do
  if [[ $D =~ '/source$' ]]; then
    for F in $(find $D -type f); do
      echo "compiling $F"
      node "$sd"/converter.js -f "$F"
    done
    mv "$D"/*.html "$D"/../out/
  fi

done
