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
@app.route("/getForm")
def getForm():
    r = make_response(render_template('form.html'))
    r.headers['Access-Control-Allow-Origin'] = '*'
    return r

# Run Flask if the __name__ variable is equal to __main__
if __name__ == "__main__":
    app.run()