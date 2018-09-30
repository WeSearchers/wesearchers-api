from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.forms import ModelForm, forms, EmailField

from .models import Profile


class UserCreationForm(UserCreationForm):
    email = EmailField(required=True, )

    class Meta:
        model = User
        fields = ("username", "email", "first_name", "last_name", "password1", "password2")

    def save(self, commit=True):
        user = super(UserCreationForm, self).save(commit=False)
        user.email = self.cleaned_data["email"]
        if commit:
            user.save()
        return user


class ProfileForm(ModelForm):
    error_messages = {
        'bio_too_long': "The bio exceeds the 240 character limit",
        'orcid_format': "The specified orcid is invalid",
    }

    class Meta:
        model = Profile
        fields = ["orcid", "bio", "image"]

    def clean_orcid(self):
        orcid = self.cleaned_data.get("orcid")
        if not orcid.isnumeric() or len(orcid) > 16:
            raise forms.ValidationError(
                self.error_messages['orcid_format'],
                code='orcid_format',
            )
        return orcid

    def clean_bio(self):
        bio = self.cleaned_data.get("bio")
        if len(bio) > 240:
            raise forms.ValidationError(
                self.error_messages['bio_too_long'],
                code='bio_too_long',
            )
        return bio
