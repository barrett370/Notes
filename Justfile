all:
	cd utils && ./compile-all.sh

diff:
	cd utils && ./diff-compile-all.sh

CI: 
	cd utils && ./compile-all-ci.sh

check:
	cd utils && ./common-mistakes.sh
