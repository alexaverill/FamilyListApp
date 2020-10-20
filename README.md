# Family List App
A re-write of a list application designed to help simplify lists for family holiday events. A replacement for a convoluted email system;

## Building
database.env
```
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=testdb
```
.env.local in familylistapp
```
DBHOST=db
DBUSER=user
DBPASSWORD=password
HOST=localhost
PORT=8989
URL=http://$HOST:$PORT
KEY=cats
EMAIL_HOST=[SMTPSERVER]
EMAIL=[USERNAME]]
EMAIL_PW=[PASSWORD]
```
Assuming you have docker installed on you machine building should be as simple and cloning this repo and running ```docker-compose up -d```