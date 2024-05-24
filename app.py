from flask import Flask, render_template, request, session, flash, redirect, url_for, make_response, jsonify
from datetime import timedelta, datetime
from functools import wraps 
from models import db, User
from db_handler import DBHandler

app = Flask(__name__)
app.secret_key = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.permanent_session_lifetime = timedelta(hours=24)

db.init_app(app)

db_handler = DBHandler(app)

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user' not in session:
            return redirect(url_for('login'))
        response = make_response(f(*args, **kwargs))
        response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0, max-age=0'
        response.headers['Pragma'] = 'no-cache'
        return response
    return decorated_function

@app.route("/update_balance", methods=["POST"])
@login_required 
def update_balance():
    user_data = session['user']
    user_id = user_data['id']
    new_balance = request.json.get('new_balance')

    if new_balance is None:
        return jsonify({"status": "error", "message": "No balance provided"}), 400

    user = User.query.get(user_id)
    if user:
        user.balance = new_balance
        db.session.commit()
        # Update session data
        session['user']['balance'] = new_balance
        return jsonify({"status": "success", "new_balance": new_balance})
    else:
        return jsonify({"status": "error", "message": "User not found"}), 404
    
@app.route('/')
def index():
    return render_template('index.html')

@app.route("/sign-in", methods = ["POST", "GET"])
def login():
    if request.method == "POST":
        email = request.form['loginUsername']
        password = request.form['loginPassword']
        user = db_handler.user_login(email, password)
        if user:
            session.permanent = True
            session['user'] = user.to_dict()
            return redirect(url_for('dashboard'))
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
@login_required
def dashboard():
    user_data = session['user']
    print(user_data)
    return render_template('dashboard/dashboard.html', user=user_data)

@app.route("/coins")
@login_required
def coins():
    user_data = session['user']
    return render_template('dashboard/coins.html', user=user_data)

@app.route("/games")
@login_required
def gamesdashboard():
    user_data = session['user']
    return render_template('dashboard/games.html', user=user_data)

@app.route("/logout")
def logout():
    session.pop('user', None)
    # flash('You have been logged out.', 'success')
    return redirect(url_for('login'))

@app.route("/game-roll-em-die")
@login_required
def roll_em_die():
    user_data = session['user']
    return render_template('games/roll-dice.html', user=user_data)

@app.route("/game-blackjack")
@login_required
def blackjack():
    user_data = session['user']
    return render_template('games/blackjack.html', user=user_data)

@app.route("/game-spin-the-wheel")
@login_required
def spin_the_wheel():
    user_data = session['user']
    return render_template('games/spin-the-wheel.html', user=user_data)

@app.route("/game-slot-machine")
@login_required
def slot_machine():
    user_data = session['user']
    return render_template('games/slot-machine.html', user=user_data)

@app.route("/game-color-game")
@login_required
def color_game():
    user_data = session['user']
    return render_template('games/color-game.html', user=user_data)

@app.route("/game-sic-bo")
@login_required
def sic_bo():
    user_data = session['user']
    return render_template('games/sic-bo.html', user=user_data)

@app.route("/game-higher-or-lower-card")
@login_required
def higher_lower_card():
    user_data = session['user']
    return render_template('games/higher-card-lower-card.html', user=user_data)

@app.route("/game-beat-the-dealer")
@login_required
def beat_the_dealer():
    user_data = session['user']
    return render_template('games/beat-the-dealer.html', user=user_data)

@app.route("/game-coin-flip")
@login_required
def coin_flip():
    user_data = session['user']
    return render_template('games/flip-coin.html', user=user_data)

@app.route("/game-dont-let-them-hang-the-dealer")
@login_required
def hang_the_dealer():
    user_data = session['user']
    return render_template('games/hang-the-dealer.html', user=user_data)
    

if __name__ == '__main__':
    app.run(debug=True)