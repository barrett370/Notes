.PHONY all:
all:
	cd utils && ./compile-all.sh

.PHONY diff:
diff:
	cd utils && ./diff-compile-all.sh
