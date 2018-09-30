from django.core.exceptions import ValidationError


class PasswordValidator:
    error_messages = {
        "too_short": "Password must be a minimum of 8 characters long",
        "not_secure": "Password must contain an upper case letter, a lower case letter and a number"
    }

    def validate(self, password, user=None):
        if len(password) < 8:
            raise ValidationError(
                self.error_messages["too_short"],
                code="too_short",
            )
        if not (any(x.isupper() for x in password) and any(x.islower() for x in password)
                and any(x.isdigit() for x in password)):
            raise ValidationError(
                self.error_messages["not_secure"],
                code="not_secure",
            )
