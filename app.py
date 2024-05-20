from flask import Flask, render_template, request, session, flash, redirect, url_for
from datetime import timedelta, datetime
from models import db, User
from db_handler import DBHandler

app = Flask(__name__)
app.secret_key = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.permanent_session_lifetime = timedelta(hours=1)

db.init_app(app)

db_handler = DBHandler(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/sign-in")
def login():
    return render_template('login/login.html')

@app.route("/register", methods = ["POST", "GET"])
def register():
    if request.method == "POST":
        first_name = request.form['firstName']
        last_name = request.form['lastName']
        age = request.form['age']
        birthday = datetime.strptime(request.form['birthday'], '%Y-%m-%d').date()
        email = request.form['email']
        username = request.form['username']
        password = request.form['password']
        confirm_password = request.form['confirmPassword']

        if password != confirm_password:
            flash('Passwords do not match!', 'error')
            return redirect(url_for('register'))

        new_user = User(
            first_name=first_name,
            last_name=last_name,
            age=age,
            birthday=birthday,
            email=email,
            username=username,
            password=password,
            balance=0,  
            image=None  
        )
        success = db_handler.insert_account(new_user)
        if success:
            return redirect(url_for('login')) 
        else:
            return redirect(url_for('register'))  

    return render_template('login/register.html')

@app.route("/forgot-password")
def forgot_password():
    return render_template('login/forgot-password.html')

@app.route("/reset-password")
def reset_password():
    return render_template('login/reset-password.html')

@app.route("/dashboard")
def dashboard():
    return render_template('dashboard/dashboard.html')

@app.route("/coins")
def coins():
    return render_template('dashboard/coins.html')

@app.route("/games")
def gamesdashboard():
    return render_template('dashboard/games.html')

@app.route("/game-base")
def gamesdashboard_base():
    return render_template('base.html')

@app.route("/game-bingo")
def game_bingo():
    return render_template('games/bingo.html')

if __name__ == '__main__':
    app.run(debug=True)