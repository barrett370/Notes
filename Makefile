.PHONY all:
all:
	cd utils && ./compile-all.sh

.PHONY diff:
diff:
	cd utils && ./diff-compile-all.sh

.PHONY CI:
CI: 
	cd utils && ./compile-all-ci.sh

check:
	cd utils && ./common-mistakes.sh
