import os
import json

from flask import Flask, session, redirect, url_for, request, render_template, jsonify
from flask_socketio import SocketIO, emit, send, join_room, leave_room

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
app.secret_key = 'super secret key'
app.config['SESSION_TYPE'] = 'filesystem'
socketio = SocketIO(app)

channel_on = "No channel chosen"
channels = []
messages = {"None" : []}

@app.route("/")
def index():
    return render_template("index.html", channels=channels, messages=json.dumps(messages))


@socketio.on("add channel")
def add(data):
    channel = data["channel"]

    if channel in channels:
        emit("show channel", "error")
    else:
        messages[channel] = []
        channels.append(channel)
        emit("show channel", channel, broadcast=True)


@socketio.on("add message")
def message(data):

    if len(messages[data["channel"]]) == 100:
        del messages[data["channel"]][0]

    messages[data["channel"]].append( { 'message' : data["message"], 'date' : data["date"], 'name' : data["name"] } )

    emit("show message", { 'message' : data["message"], 'channel' : data["channel"], 'date' : data["date"], 'name' : data["name"] }, broadcast=True)


@socketio.on("delete message myself")
def delete_msg(data):

    del messages[data["channel"]][data["index"]]

    emit("delete message animation", { 'index' : data["index"], 'channel' : data["channel"] }, broadcast=True)
