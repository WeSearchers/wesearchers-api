from django.forms import ModelForm
from .models import Profile


class ProfileForm(ModelForm):
    class Meta:
        model = Profile
        fields = ["user", "orcid_id", "institution", "bio", "image"]
