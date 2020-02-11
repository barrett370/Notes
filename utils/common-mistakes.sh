#!/bin/bash 

declare -a arr=("adn" "nad" "taht" "te" "teh")

for each in "${arr[@]}"
do 
	echo "$each"
	ack -w --type markdown $each ../Y3 ../Y2
done 
