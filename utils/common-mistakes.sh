#!/bin/bash 

declare -a arr=("adn" "nad")

for each in "${arr[@]}"
do 
	echo "$each"
	ack -w $each ../Y3 ../Y2
done 
