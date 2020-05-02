dependencies:
	npm install

format:
	./node_modules/prettier/bin-prettier.js --write "src/**/*.{ts,tsx}"

lint:
	npm run lint
	./node_modules/prettier/bin-prettier.js --write "src/**/*.{ts,tsx}"
	./node_modules/typescript/bin/tsc --noEmit --rootDir .

start:
	npm start

test:
	npm run test