.PHONY: install build

install:
	yarn install

build: install
	yarn build

win:
	yarn electron:build --win