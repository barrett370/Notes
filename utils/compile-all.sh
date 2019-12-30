sd=$(pwd)
echo $sd
tsc converter.ts
cd Y3

for D in $(find . -type d); do
  if [[ $D =~ '/source$' ]]; then
    #    echo "true, $D"
    for F in $(find $D -type f); do
      echo "compiling $F"
      tsc $sd/utils/converter.ts && node $sd/utils/converter.js -f $F
    done
    mv $D/*.html $D/../out/
    #  else
    #    echo "false, $D "
  fi

done
