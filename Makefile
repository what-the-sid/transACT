SHELL := /bin/bash

.PHONY: all
all: clean build deploy

ifneq (,$(wildcard .env))
    include .env
    export
endif

.PHONY: clean
clean:
	@echo "Cleaning up cache and builds"
	@rm -rf dist .serverless

.PHONY: build
build:
	@echo "Building Service"
	@yarn build

.PHONY: deploy
deploy:
	@echo "Deploying Service"
	@yarn deploy

.PHONY: destroy
destroy:
	@echo "Destroying Service"
	@yarn destroy
