.PHONY: dev build image image-run

IMAGE_NAME:=ghcr.io/devbasecom/celestia-docs-cn:latest

dev:
	yarn docs:dev

build:
	yarn docs:build

image:
	docker build . -t ${IMAGE_NAME}

image-run:
	docker run -it --rm -p 127.0.0.1:5173:80 ${IMAGE_NAME}

image-buildx:
	docker buildx build --platform linux/arm64,linux/amd64 -t ${IMAGE_NAME} . --load

