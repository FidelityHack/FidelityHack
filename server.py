# Import the Flask package
from flask import Flask, jsonify, make_response, render_template
from flask_cors import CORS
# Initialize Flask
app = Flask(__name__)
CORS(app)
# Define the index route
@app.route("/")
def index():
    return "hello!"
@app.route("/getForm", methods=["GET"])
def getForm():
    data = ''
    with open('form/form.html', 'r') as file:
        data = file.read().replace('\n', '')
    response = make_response(render_template(data))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
@app.route("/getStyle", methods=["GET"])
def getStyle():
    data = ''
    with open('static/form.css', 'r') as file:
        data = file.read().replace('\n', '')
    resp = Response(data, mimetype="text/css")
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
@app.route("/getJS", methods=["GET"])
def getJS():
    data = ''
    with open('static/form.js', 'r') as file:
        data = file.read().replace('\n', '')
    resp = Response(data, mimetype="text/javascript")
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
@app.route("/getiframe", methods=["GET"])
def getiframe():
    data = ''
    with open('iframe.html', 'r') as file:
        data = file.read().replace('\n', '')
    response = jsonify({'msg':data})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
# Run Flask if the __name__ variable is equal to __main__
if __name__ == "__main__":
    app.run()