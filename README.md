# Fat And Lazy

## Initialize Django/Postgres Environment

### Python 3.4.0

### install on computer

- sudo apt-get install libpq-dev python-dev
- sudo apt-get install postgresql postgresql-contrib

### create virtualenv, install project dependencies in virtualenv:
#### (use 'which python' to find location of Python; 'webarch' is name of virtualenv in this example.)
- virtualenv -p /usr/bin/python3.4 webarch
- source webarch/bin/activate
- pip install -r requirements.txt
- python manage.py startproject fatandlazy .
- python manage.py startapp locations

### to save or install python packages (note: use within activated virtualenv):
- pip freeze > requirements.txt
- pip install -r requirements.txt

### STAGING DB MIGRATIONS; MIGRATE DATABASE
- python manage.py makemigrations
- python manage.py migrate

### Run Local Server (at localhost)
- python manage.py runserver

### General Postgres connection form:
- postgresql://[user[:password]@][netloc][:port][/dbname][?param1=value1&...]
- (see http://www.postgresql.org/docs/9.3/static/libpq-connect.html)

### Other Heroku Configuration
- install the heroku toolbelt (at https://toolbelt.heroku.com/)
- establish heroku credentials by logging-into my heroku account using the 'heroku login' command
- github integration: https://devcenter.heroku.com/articles/github-integration

### Local vs. Production Databases: Setting $DATABASE_URL path
- use "export DATABASE_URL=" on local machine to change between local and live instances of database
