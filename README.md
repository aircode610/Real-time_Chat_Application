
# 💬 Real-time Chat Application

A **real-time chat application** built with **Flask**, **Socket.io**, and **JavaScript** that allows users to chat in **real-time**. The project includes **user authentication**, **message persistence**, and **websocket communication** for seamless message delivery.

## 🚀 Features

✅ **Real-time Messaging** – Instant message delivery with WebSockets using **Socket.io**  
✅ **User Authentication** – Secure **login and registration** system  
✅ **Message Persistence** – Messages are stored in the database for future reference  
✅ **Chat Rooms** – Users can join specific chat rooms for group discussions  
✅ **Emojis Support** – Includes a simple emoji set to enhance chat experience  

## 🛠️ Technologies Used

- **Backend:** Flask, Flask-SocketIO  
- **Frontend:** HTML, CSS, JavaScript  
- **Database:** SQLite  
- **WebSocket:** Socket.io for real-time communication

## 📂 Project Structure

```
📁 Real-time_Chat_Application  
│── 📂 static/            # CSS, JS, images  
│── 📂 templates/         # HTML templates  
│── 📂 models/            # Database models  
│── 📜 app.py             # Main Flask application  
│── 📜 config.py          # Configuration settings  
│── 📜 requirements.txt   # Dependencies  
│── 📜 README.md          # Project documentation  
│── 📜 .env               # API keys and secrets (not included in repo)  
```

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/aircode610/Real-time_Chat_Application.git
cd Real-time_Chat_Application
```

### 2️⃣ Create a Virtual Environment & Install Dependencies
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the root directory and add:
```
SECRET_KEY=your_secret_key
```

### 4️⃣ Run the Application
```bash
flask run
```
Visit **http://127.0.0.1:5000/** in your browser.

## 📡 Features & Usage

### 1️⃣ **Real-time Messaging**
Users can send messages to each other in real-time through WebSockets.

### 2️⃣ **User Authentication**
Users need to register and log in to start chatting. Passwords are securely stored and hashed.

### 3️⃣ **Join Chat Rooms**
Users can join various chat rooms by selecting one from the interface. Once inside, they can chat with others in that room.

### 4️⃣ **Emojis Support**
A basic set of emojis are included to enhance chat messages.

## 🎥 Watch the YouTube Video for a Demo
You can watch the video walkthrough of this project on YouTube:  
[Real-time Chat Application Demo](https://youtu.be/JPdDNFA8SSM)
