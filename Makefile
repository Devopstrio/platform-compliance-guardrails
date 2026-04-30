.PHONY: help build up down test lint migrate scan-iac evaluate-policies

help:
	@echo "Platform Compliance Guardrails - Management Commands"
	@echo "---------------------------------------------------"
	@echo "build              : Build all service containers"
	@echo "up                 : Start all services in the background"
	@echo "down               : Stop all services"
	@echo "test               : Run all tests (Unit + Policy)"
	@echo "lint               : Run linting checks"
	@echo "migrate            : Run database migrations"
	@echo "scan-iac           : Run a mock IaC compliance scan"
	@echo "evaluate-policies  : Manually trigger policy evaluation"

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

test:
	pytest tests/api tests/policies
	npm test --prefix apps/web

lint:
	flake8 apps/api apps/worker apps/policy-engine
	npm run lint --prefix apps/web

migrate:
	docker-compose exec api alembic upgrade head

scan-iac:
	docker-compose exec api python scripts/scan/scan_iac.py --path tests/compliance_scenarios/

evaluate-policies:
	docker-compose exec api python apps/policy-engine/main.py --evaluate-all
