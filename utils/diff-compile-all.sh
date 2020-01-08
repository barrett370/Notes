sd=$(pwd)
tsc "$sd"/converter.ts
cd ../content/modules || exit
CHANGED_MD=$(git diff-index --name-only HEAD -- | grep '.md')
echo $CHANGED_MD
#echo $CHANGED_MD
for D in $(find . -type d); do
  if [[ $D =~ '/source$' ]]; then
    echo "looking in $D"
    for F in $(find $D -type f); do
      for item in "${CHANGED_MD[@]}"; do
        
        str1="${F:2}"
        str2="${item#content/modules/}"
        echo "F" $F "\n" "item" $item "\n\n"
        if [[ "$str1" = "$str2" ]] then 
         node "$sd"/converter.js -f "$F"
        fi 
      done
    done
    mv "$D"/*.html "$D"/../lectures/
  fi

done
