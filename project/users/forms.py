from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.forms import ModelForm, forms, EmailField, ImageField
from django.core.files.images import get_image_dimensions

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
        fields = ["orcid", "bio", "image"]
