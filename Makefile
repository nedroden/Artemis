build:
	cd Api && make build

dependencies:
	cd Api && make dependencies
	cd WebInterface && make dependencies

format:
	cd WebInterface && make format

lint:
	cd WebInterface && make lint

migrate:
	cd Api && make migrate

run_api:
	cd Api && make start

run_frontend:
	cd WebInterface && make start

test:
	cd Api && make test
	# cd WebInterface && make test