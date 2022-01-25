#!/usr/bin/env python3
# A web server to echo back a request's headers and data.
#
# Usage: ./webserver
#        ./webserver 0.0.0.0:5000

from http.server import HTTPServer, ThreadingHTTPServer, BaseHTTPRequestHandler
import json
from sys import argv

import string
from nltk.corpus import stopwords
import joblib

def model(text):
    # Convert to lowercase
    text = text.lower()

    # Remove punctuation
    all_list = [char for char in text if char not in string.punctuation]
    clean_str = ''.join(all_list)
    text = clean_str

    # Removing stopwords
    stop = stopwords.words('english')
    text = ' '.join([word for word in text.split() if word not in (stop)])
    print("***************************")
    print("Text:", text)
    print("***************************")

    # load the model from disk
    text = [text]
    loaded_model = joblib.load("finalized_model.sav", mmap_mode='r')
    result = loaded_model.predict(text)
    return result


# print(model("Microsoft says it plans to buy major games company Activision Blizzard in a deal worth $68.7bn (£50.57bn)"))








BIND_HOST = 'localhost'
PORT = 8008


class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.write_response(b'')

    def do_POST(self):
        content_length = int(self.headers.get('content-length', 0))
        body = self.rfile.read(content_length)
        print("body", body)
        text = str(body)
        # text = text[10:-2]
        result = model(text)
        # print(result)
        result = bytes(result[0], 'utf-8')
        self.write_response(result)

    def write_response(self, content):
        print("content", content)
        self.send_response(200)
        self.end_headers()
        self.wfile.write(content)
        print(self.headers)
        print(content.decode('utf-8'))


if len(argv) > 1:
    arg = argv[1].split(':')
    BIND_HOST = arg[0]
    PORT = int(arg[1])

print(f'Listening on http://{BIND_HOST}:{PORT}\n')

httpd =ThreadingHTTPServer((BIND_HOST, PORT), SimpleHTTPRequestHandler)
httpd.serve_forever()
