from django.validators import URLValidator

class ArticlePublishingForm(ModelForm):
    error_messages = {
        'title_too_long' : "Title exceeds the 255 character limit",
        'url_invalid' : "Media has invalid URL"
    }
    class Meta:
        model = Article
        fields = ("title", "text", "url", "tags")
    
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
        val = URLValidator(verify_exists=True)
        try:
            validate(url)
        except ValidationError:
            raise forms.ValidationError(
                self.error_messages['url_invalid'],
                code='url_invalid',
            )
        return url

class CommentPublishingForm(ModelForm):
    error_messages = {
        'text_too_long' : "Comment exceeds 7900 character limit"
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
        