from django.db import models

from graduationback import settings


class Image(models.Model):

    image = models.ImageField(upload_to=settings.IMAGE_FOLDER, max_length=255, null=True)
    date_created = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        verbose_name = "pic"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.id
