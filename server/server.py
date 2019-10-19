# Import the Flask package
from flask import Flask, jsonify
from flask_cors import CORS
# Initialize Flask
app = Flask(__name__)
CORS(app)
# Define the index route
@app.route("/")
def index():
    return "hello!"
@app.route("/getit", methods=["GET"])
def getit():
    data = ''
    with open('test.html', 'r') as file:
        data = file.read().replace('\n', '')
    response = jsonify({'msg':data})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
# Run Flask if the __name__ variable is equal to __main__
if __name__ == "__main__":
    app.run()