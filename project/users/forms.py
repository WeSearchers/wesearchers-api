from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.core.validators import URLValidator
from django.forms import ModelForm, forms, EmailField, ImageField
from django.core.files.images import get_image_dimensions

from .models import Profile, Resource


class UserCreationForm(UserCreationForm):
    email = EmailField(required=True, )

    class Meta:
        model = User
        fields = ("username", "email", "password1", "password2")

    def save(self, commit=True):
        user = super(UserCreationForm, self).save(commit=False)
        user.email = self.cleaned_data["email"]
        if commit:
            user.save()
        return user


class UserUpdateForm(ModelForm):
    class Meta:
        model = User
        fields = ("first_name", "last_name")


class ProfileForm(ModelForm):
    error_messages = {
        'bio_too_long': "The bio exceeds the 240 character limit",
        'orcid_format': "The specified orcid is invalid",
        'image_too_large': "The specified image exceeds the maximum dimensions"
    }

    class Meta:
        model = Profile
        fields = ["bio", "image"]

    def clean_bio(self):
        bio = self.cleaned_data.get("bio")
        if len(bio) > 240:
            raise forms.ValidationError(
                self.error_messages['bio_too_long'],
                code='bio_too_long',
            )
        return bio

    def clean_image(self):
        image = self.cleaned_data.get("image")
        w, h = get_image_dimensions(image)
        """if w > 1000 or h > 1000:
            raise forms.ValidationError(
                self.error_messages['image_too_large'],
                code='image_too_large',
            )"""
        return image


class ProfileUpdateForm(ProfileForm):
    image = ImageField(required=False)

    class Meta:
        model = Profile
        fields = ["bio", "image"]


class ResourceForm(ModelForm):
    error_messages = {
        'title_too_long': "The title exceeds the 50 character limit",
        'url_invalid': "The url is invalid"
    }

    class Meta:
        model = Resource
        fields = ["title", "url"]

    def clean_title(self):
        title = self.cleaned_data.get('title')
        if len(title) > 50:
            raise forms.ValidationError(
                self.error_messages['title_too_long'],
                code='title_too_long',
            )
        return title

    def clean_url(self):
        url = self.cleaned_data.get("url")
        val = URLValidator()
        try:
            val(url)
        except ValidationError:
            raise forms.ValidationError(
                self.error_messages['url_invalid'],
                code='url_invalid',
            )
        return url
