# Fat And Lazy

## Initialize Django/Postgres Environment

### Python 3.4.0 (heroku needs the Python version specified in the 'runtime.txt' file)

#### install PostgreSQL packages on computer
- sudo apt-get install libpq-dev python-dev postgresql postgresql-contrib

### create virtualenv, install project dependencies in virtualenv:
#### (use 'which python' to find location of Python; 'webarch' is name of virtualenv in this example.)
- virtualenv -p /usr/bin/python3.4 webarch
- source webarch/bin/activate
- pip install -r requirements.txt

#### requirements.txt
#### to save currently-installed Python packages
- pip freeze > requirements.txt
#### to install python packages (note: use within activated virtualenv):
- pip install -r requirements.txt

#### creation of new project (e.g., 'fatandlazy') or new app (e.g., 'locations')
- python manage.py startproject fatandlazy .
- python manage.py startapp locations

#### Preparing/Staging Database Migrations; Migrating Database
- python manage.py makemigrations
- python manage.py migrate

#### Run Local Server (at localhost)
- python manage.py runserver

#### General Postgres connection structure:
- postgresql://[user[:password]@][netloc][:port][/dbname][?param1=value1&...]
- (see http://www.postgresql.org/docs/9.3/static/libpq-connect.html)

#### Setting Environmental Paths (e.g., Local vs. Production Databases: Setting $DATABASE_URL path) -- useful for removing hardcoded values from
- use environment variables on different machines (e.g., local/dev, live/production) to switch between settings without having to hardcode them in settings.py (e.g., local and live instances of database)
- to retrieve database settings from heroku: heroku config:get DATABASE_URL
- to create new envpath on heroku: heroku config:add ENV_NAME=VALUE
- to create new envpath on local machine: export ENV_NAME=VALUE
- on local machine, add the DEBUG_SETTING=False and DATABASE_URL envpaths

#### Heroku Toolbelt
- install the heroku toolbelt (at https://toolbelt.heroku.com/)
- establish heroku credentials by logging-into my heroku account using the 'heroku login' command
- github integration: https://devcenter.heroku.com/articles/github-integration
