CREATE ROLE eric WITH LOGIN SUPERUSER PASSWORD '1234';
GRANT ALL PRIVILEGES ON DATABASE postgres TO eric;
GRANT ALL PRIVILEGES ON DATABASE coredb TO eric;