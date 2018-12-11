from django.forms import forms, CharField, FileField


class TweetPublishingForm(forms.Form):
    error_messages = {
        'text_too_long': "Tweet exceeds 280 character limit",
        'media_format': "Unsupported media format"
    }

    text = CharField(required=True)
    media = FileField(required=False)

    def clean_text(self):
        text = self.cleaned_data.get("text")
        if len(text) > 280:
            raise forms.ValidationError(
                self.error_messages['text_too_long'],
                code='text_too_long',
            )
        return text

    def clean_media(self):
        media = self.cleaned_data.get("media")
        if media is not None and not media.content_type.startswith("image") and not media.content_type.startswith(
                "video"):
            raise forms.ValidationError(
                self.error_messages["media_format"],
                code="media_format"
            )
        return media
