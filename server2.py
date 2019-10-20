# Import the Flask package
from flask import Flask, jsonify, make_response, render_template, request
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
@app.route("/getOutput", methods=['POST'])
def getOutput():
    print(request.form)
    data = {
        'age': request.form['age'],
        'time': request.form['time'],
        'amount': request.form['amount'],
        'regular': request.form['regular'],
        'frequency': request.form['frequency'],
        'risk': request.form['risk']
    }
    print(data)
    r = make_response(render_template('output.html', flaskInsert=data))
    r.headers['Access-Control-Allow-Origin'] = '*'
    return r
# Run Flask if the __name__ variable is equal to __main__
if __name__ == "__main__":
    app.run()