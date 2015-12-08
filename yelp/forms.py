from django import forms

class YelpForm(forms.Form):
    location = forms.CharField(label='Location:', max_length=100)
