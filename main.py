from flask import Flask, render_template, request, jsonify
from os import environ
import openai

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def home():
  return render_template("index.html")


@app.route('/chat', methods=['POST'])
def chat():
  user_input = request.form['user_input']
  response = generate_response(
    user_input)  # use your own function to generate a response
  return jsonify(response=response)


def generate_response(text):
  openai.api_key = environ['OPENAI_API_KEY2']

  response = openai.Completion.create(model="text-davinci-003",
                                      prompt=str(text),
                                      temperature=1,
                                      max_tokens=4000)
  print(response)
  return response


if __name__ == '__main__':
  app.run(host='0.0.0.0', port=8080)
