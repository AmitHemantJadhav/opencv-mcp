# analyzeImage.py
import sys
import cv2
import numpy as np
import urllib.request

def fetch_image(url):
    resp = urllib.request.urlopen(url)
    image = np.asarray(bytearray(resp.read()), dtype="uint8")
    return cv2.imdecode(image, cv2.IMREAD_COLOR)

url = sys.argv[1]
img = fetch_image(url)

height, width = img.shape[:2]
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
edges = cv2.Canny(gray, 100, 200)

is_grayscale = np.array_equal(img[:,:,0], img[:,:,1]) and np.array_equal(img[:,:,1], img[:,:,2])
num_edges = cv2.countNonZero(edges)

print(f"{width},{height},{is_grayscale},{num_edges}")
