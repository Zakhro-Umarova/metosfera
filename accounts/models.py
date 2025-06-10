
from django.db import models
# Create your models here.
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.conf import settings

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    patronymic = models.CharField(max_length=30, blank=True, null=True)
    username = models.CharField(max_length=30, unique=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    University_CHOICES = (
        ('TDPU', 'Toshkent davlat pedagogika universiteti'),
        ('QDPI', 'Qo\'qon davlat pedagogika instituti'),
        ('UzFiPI', 'O\'zbekiston Finlandiya pedagogika instituti'),
    )
    university = models.CharField(max_length=10, choices=University_CHOICES, default=' ',
                                  )
    faculty = models.CharField(max_length=100)
    group = models.CharField(max_length=100)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)  # Add this line
    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser

class List(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title

class Note(models.Model):
    NOTE_TYPE_CHOICES = [
        ('text', 'Text'),
        ('image', 'Image'),
        ('audio', 'Audio'),
        ('video', 'Video'),
        ('url', 'URL'),
        ('file', 'File'),
    ]
    COLOR_CHOICES = [
        ('red', 'Red'),
        ('green', 'Green'),
        ('yellow', 'Yellow'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    list = models.ForeignKey('List', on_delete=models.CASCADE, related_name='notes')  # Link to List
    content = models.TextField(blank=True, null=True)  # For text notes
    image = models.ImageField(upload_to='notes/images/', blank=True, null=True)  # For image notes
    audio = models.FileField(upload_to='notes/audio/', blank=True, null=True)  # For audio notes
    video = models.FileField(upload_to='notes/videos/', blank=True, null=True)  # For video notes
    url = models.URLField(blank=True, null=True)  # For URL notes
    file = models.FileField(upload_to='notes/files/', blank=True, null=True)  # For file notes
    type = models.CharField(max_length=10, choices=NOTE_TYPE_CHOICES, default='text')  # Add this line
    color = models.CharField(max_length=10, choices=COLOR_CHOICES, blank=True, null=True, default='red')  # Set a default value
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.content[:20]} - {self.user.email}"  # Display first 20 characters of content
class Plant(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    status = models.CharField(max_length=10)  # 'Healthy' or 'Dead'
    image = models.ImageField(upload_to='plants/')
    date = models.DateField()
    time = models.FloatField()  # Store time in minutes

    def __str__(self):
        return f"{self.user.email} - {self.status} on {self.date}"

class Allowlist(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    url = models.URLField()

    def __str__(self):
        return f"{self.user.email} - {self.url}"

class Blocklist(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    url = models.URLField()

    def __str__(self):
        return f"{self.user.email} - {self.url}"
    