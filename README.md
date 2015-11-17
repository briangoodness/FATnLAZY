# Fat And Lazy

## Initialize Django/Postgres Environment

### install on computer

sudo apt-get install libpq-dev python-dev
sudo apt-get install postgresql postgresql-contrib


### create virtualenv, install project dependencies in virtualenv:

- virtualenv webarch
- source webarch/bin/activate
- pip install -r requirements.txt
- django-admin.py startproject fatandlazy .
- python manage.py startapp locations

