from django.db import models

# Create your models here.
class Restaurant(models.Model):
    name = models.CharField(max_length=255, null=True)
    address1 = models.CharField(max_length=255, null=True)
    address2 = models.CharField(max_length=255, null=True)
    city = models.CharField(max_length=100, null=True)
    state = models.CharField(max_length=50, null=True)
    zip5 = models.CharField(max_length=5, null=True)
    country = models.CharField(max_length=50, null=True)

class MenuItems(models.Model):
    restaurant = models.ForeignKey('Restaurant')
    name = models.CharField(max_length=50, null=True)
#    ingredients = models.ManyToManyField('Ingredient')

#class Ingredient(models.Model):
#    name = models.CharField(max_length=100, null=True)
    
