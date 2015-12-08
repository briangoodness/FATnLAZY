"""fatandlazy URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin

from locations import views as locations_views
from gmaps import views as gmaps_views
from yelp import views as yelp_views
from fatnlazyapp import views as fnl_views
import settings

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),

    url(r'^$', fnl_views.index, name='index'),
    url(r'^currentlocation$', fnl_views.currentlocation, name='currentlocation'),
    (r'(?:.*?/)?(?P<path>(css|js|img)/.+)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT }),
    # url(r'^$', yelp_views.get_results, name='yelp-form'),
    #url(r'^map/$', locations_views.map, name='leaflet-map')
    #url(r'^yelp-results/?q=(\w+)$', yelp_views.post_results, name='yelp-results')
    url(r'^yelp/$', yelp_views.get_results, name='yelp-form'),
    url(r'^map/$', yelp_views.uber_map, name='uber-map')
]
