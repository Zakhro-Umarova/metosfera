from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import CustomUser
from django import forms

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = (
            'email', 'password1', 'password2', 'first_name', 'last_name',
            'patronymic', 'username', 'phone', 'university', 'faculty',
            'group', 'avatar'
        )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields.pop('usable_password', None)  # Remove the 'usable_password' field

class ProfileUpdateForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'patronymic', 'phone', 'university', 'faculty', 'group', 'avatar']