from django.http import HttpResponse
from django.shortcuts import render
import json
from urllib.parse import unquote
import time
import os
import base64
from django.views.decorators.clickjacking import xframe_options_exempt
import dr_diagnose.dr_predict as dr_predict

img_root_dir = '/my_code/PythonCode/dr_diagnose/zqxt_tmp'

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




