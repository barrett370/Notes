sd=$(pwd)
tsc "$sd"/converter.ts
echo $sd
cd ../public/content/modules || exit
CHANGED_MD=$(git diff-index --name-only HEAD -- | grep '.md')
#echo $CHANGED_MD
for D in $(find . -type d); do
  if [[ $D =~ '/source$' ]]; then
    echo "Looking in $D"
    for F in $(find $D -type f); do
      for item in "${CHANGED_MD[@]}"; do
        str1="${F:2}"
        str2="${item}"
        [ "$str1" = "$str2" ] && node "$sd"/converter.js -f "$F"
      done
    done
    mv "$D"/*.html "$D"/../lectures/
  fi

done
