import os

from flask import Flask, session, redirect, url_for, request, render_template, jsonify
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
app.secret_key = 'super secret key'
app.config['SESSION_TYPE'] = 'filesystem'
socketio = SocketIO(app)

channels = []


@app.route("/")
def index():
    return render_template("index.html", channels=channels)


@socketio.on("add channel")
def add(data):
    channel = data["channel"]

    if channel in channels:
        emit("channel show", "error")
    else:
        channels.append(channel)
        emit("channel show", {"channel" : channel}, broadcast=True)
