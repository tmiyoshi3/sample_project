#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE keycloak_migrated;
    GRANT ALL PRIVILEGES ON DATABASE keycloak_migrated TO $POSTGRES_USER;
EOSQL
