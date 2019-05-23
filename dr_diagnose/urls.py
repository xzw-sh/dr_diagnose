"""dr_diagnose URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import url
from django.views.static import serve
from dr_diagnose import view as my_view

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^$', my_view.home),
    url(r'^main', my_view.main),
    url(r'tangniaobing', my_view.detect),
    url(r'^zqxt_tmp/(?P<path>.*)$', serve, {'document_root': 'zqxt_tmp'}),
    url(r'^detection_img/(?P<path>.*)$', serve, {'document_root': 'detection_img'}),
    url(r'^images/(?P<path>.*)$', serve, {'document_root': 'static/images'}),
]
