from django.core.exceptions import ValidationError
from django.core.validators import URLValidator
from django.forms import ModelForm, forms, URLField, ImageField

from .models import Article, Comment


class ArticlePublishingForm(ModelForm):
    error_messages = {
        'title_too_long': "Title exceeds the 255 character limit",
        'url_invalid': "Media has invalid URL"
    }

    url = URLField(required=False)
    media_url = URLField(required=False)
    image = ImageField(required=False)

    class Meta:
        model = Article
        fields = ("title", "text", "url", "media_url", "image")

    def clean_title(self):
        title = self.cleaned_data.get("title")
        if len(title) > 255:
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

    def clean_media_url(self):
        media_url = self.cleaned_data.get("url")
        val = URLValidator()
        try:
            val(media_url)
        except ValidationError:
            raise forms.ValidationError(
                self.error_messages['url_invalid'],
                code='url_invalid',
            )
        return media_url


class CommentPublishingForm(ModelForm):
    error_messages = {
        'text_too_long': "Comment exceeds 7900 character limit"
    }

    class Meta:
        model = Comment
        fields = ("text",)

    def clean_text(self):
        text = self.cleaned_data.get("text")
        if len(text) > 7900:
            raise forms.ValidationError(
                self.error_messages['text_too_long'],
                code='text_too_long',
            )
        return text
