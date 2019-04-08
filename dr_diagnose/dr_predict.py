import os
import tensorflow as tf
from tensorflow import keras
from dr_diagnose.Net import ImgNet
import cv2
import numpy as np

model_path = "/my_code/PythonCode/dr_diagnose/dr_diagnose/saved_models"
model = ImgNet.build(input_shape=(512, 512, 3))
model.load_weights(os.path.join(model_path, '9_pre_model.h5'))
graph = tf.get_default_graph()
max_Iterater = 10


def scaleRadius(img, scale):
    x = img[img.shape[0] // 2, :, :].sum(1)
    r = (x > x.mean() / 10).sum() / 2
    s = scale * 1.0 / r
    img = cv2.resize(img, (0, 0), fx=s, fy=s)
    width = img.shape[1]
    height = img.shape[0]
    width_margin = (width - scale*2) // 2
    high_margin = (height - scale*2) // 2
    if high_margin >= 0:
        crop_img = img[high_margin: high_margin + scale*2, width_margin: width_margin + scale*2, :]
    else:
        top_fill_array = np.zeros(shape=(-high_margin, scale*2, 3))
        crop_img = img[:, width_margin:
                          width_margin + scale*2, :]
        crop_img = np.append(top_fill_array, crop_img, axis=0)
        bottom_margin = 512 - crop_img.shape[0]
        bottom_fill_array = np.zeros(shape=(bottom_margin, scale*2, 3))
        crop_img = np.append(crop_img, bottom_fill_array, axis=0)
    return crop_img


def get_predict(img_path):
    for i in range(max_Iterater):
        img = cv2.imdecode(np.fromfile(img_path, dtype=np.uint8), -1)
        if img.shape[0] > 512:
            a = scaleRadius(img, 256)
            b = np.zeros(a.shape)
            cv2.circle(b, (a.shape[1] // 2, a.shape[0] // 2), int(256 * 0.9), (1, 1, 1), -1, 8, 0)
            img = cv2.addWeighted(a, 4, cv2.GaussianBlur(a, (0, 0), 256 / 30), -4, 128)
            img = img * b + 128 * (1 - b)
        img = img.astype("float") / 255.
        img = keras.preprocessing.image.img_to_array(img)
        img = np.expand_dims(img, axis=0)
        with graph.as_default():
            pred = model.predict(img)
        levels = pred[0][0]
        diseases = pred[1][0]
        predict_level = np.argmax(levels)
        predict_disease = np.argmax(diseases)
        if (predict_level > 0 and predict_disease == 1) or (predict_level == predict_disease):
            return predict_level
        else:
            if i == max_Iterater - 1:
                return -1
            continue







    with graph.as_default():
        results = model.predict(x)

    predict_value = np.argmax(results)
    if predict_value > 0:
        symbol = "diseased"
        with graph.as_default():
            full_results = full_model.predict(x);
            full_predict_value = np.argmax(full_results)
            full_predict_value = full_predict_value + 1;
            print(" full_predict_value is " + str(full_predict_value))
            return str(full_predict_value);
    else:
        return "0"



