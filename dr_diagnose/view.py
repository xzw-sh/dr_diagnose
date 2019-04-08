from django.http import HttpResponse
from django.shortcuts import render
import json
from urllib.parse import unquote
import time
import os
import base64
import sys
from django.views.decorators.clickjacking import xframe_options_exempt
import dr_diagnose.dr_predict as dr_predict
import dr_diagnose

current_path = os.path.dirname(dr_diagnose.__file__)
PROJECT_ROOT = os.path.dirname(current_path)
img_root_dir = os.path.join(PROJECT_ROOT, 'zqxt_tmp')

@xframe_options_exempt
def home(request):
    return render(request, "home.html")


@xframe_options_exempt
def main(request):
    return render(request, "main.html")


def detect(request):
    name = request.POST['name']
    suffix_name = '.' + name.split('.')[-1]
    image = request.POST['image']
    imgbody = unquote(str(image))
    imgData = base64.b64decode(imgbody.split(",")[1])
    img_name = str(time.time()) + suffix_name
    file = open(os.path.join(img_root_dir, img_name), 'wb')
    file.write(imgData)
    file.close()
    predict_level = dr_predict.get_predict(os.path.join(img_root_dir, img_name))
    resultob = {"result": str(predict_level)}
    resultjson = json.dumps(resultob)
    # print(resultjson)
    return HttpResponse(resultjson)




