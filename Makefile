.PHONY all:
all:
	cd utils && zsh compile-all.sh

.PHONY diff:
diff:
	cd utils && zsh diff-compile-all.sh
