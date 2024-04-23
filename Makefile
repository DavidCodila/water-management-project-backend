prepare:
	mkdir -p dist

clean: prepare
	rm -rf dist/*

dist/index.js: src/controllers/index.ts
	bun build $< --outdir $@

build: clean dist/index.js