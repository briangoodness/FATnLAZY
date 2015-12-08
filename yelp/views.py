from django.shortcuts import render
from django.http import HttpResponse
from django.http import HttpResponseRedirect

from django.template.loader import get_template

from django.shortcuts import render

from .forms import YelpForm

from django.http import JsonResponse

import os
import rauth

# Create your views here.
def index(request):
    return HttpResponse("<b>Yelp Results Page!<b>")

def get_search_parameters(lat,long, radius="2000", results_limit="1"):
    #See the Yelp API for more details
    params = {}
    params["term"] = "restaurant"
    params["ll"] = "{},{}".format(str(lat),str(long))
    #params["location"] = 'Berkeley, California'
    params["radius_filter"] = radius
    params["limit"] = results_limit
    return params

def get_yelp_results(params):

    # retrieve envronmental variables
    consumer_key = os.environ['YELP_CONSUMER_KEY']
    consumer_secret = os.environ['YELP_CONSUMER_SECRET']
    token = os.environ['YELP_TOKEN']
    token_secret = os.environ['YELP_TOKEN_SECRET']

    # establish session
    # note: need to configure web server with environmental variables
    session = rauth.OAuth1Session(
        consumer_key = consumer_key,
        consumer_secret = consumer_secret,
        access_token = token,
        access_token_secret = token_secret)

    # send request to Yelp API
    request = session.get("http://api.yelp.com/v2/search", params=params)

    #Transforms the JSON API response into a Python dictionary
    data = request.json()
    session.close()

    return data

def get_results(request):

    # if this is a POST request we need to process the form data
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        form = YelpForm(request.POST)
        # check whether it's valid:
        if form.is_valid():
            # process the data in form.cleaned_data as required

            params = get_search_parameters(lat,long)
            results = get_yelp_results(params)

            # redirect to a new URL:
            return HttpResponseRedirect('/location/')

    # if a GET (or any other method) we'll create a blank form
    else:
        form = YelpForm()
        params = get_search_parameters(37.8717,-122.2728) # pass-in parameters for user's location
        print(params)
        results = get_yelp_results(params)
        #results = JsonResponse(get_yelp_results(params))
        #print(results.content)

    return render(request, 'yelp-results.html', {'form': form, 'results':results})

#def post_results(request, query):
#    return HttpResponse("<b>Yelp Results Page!<b><br>%s" %s query)
