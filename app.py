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
        # session['user']['balance'] = new_balance
        # session.modified = True
        return jsonify({"status": "success", "new_balance": new_balance})
    else:
        return jsonify({"status": "error", "message": "User not found"}), 404

@app.route("/add_balance", methods=["POST"])
@login_required
def add_balance():
    user_data = session['user']
    user_id = user_data['id']
    points_to_add = request.json.get('added_points')
    print("Points to add:", points_to_add)
    if points_to_add is None:
        return jsonify({"status": "error", "message": "No points provided"}), 400
    points_to_add = int(points_to_add)
    user = User.query.get(user_id)
    if user:
        new_balance = user.balance + points_to_add
        user.balance = new_balance
        db.session.commit()

        # session['user']['balance'] = new_balance
        # session.modified = True

        return jsonify({"status": "success", "new_balance": new_balance})
    else:
        return jsonify({"status": "error", "message": "User not found"}), 404

@app.route("/deduct_points", methods=["POST"])
@login_required
def deduct_points():
    user_data = session['user']
    user_id = user_data['id']
    points_to_deduct = request.json.get('deducted_points')

    print("Points to deduct:", points_to_deduct)

    if points_to_deduct is None:
        return jsonify({"status": "error", "message": "No points provided"}), 400
    points_to_deduct = int(points_to_deduct)
    user = User.query.get(user_id)
    if user:
        new_balance = user.balance - points_to_deduct
        if new_balance < 0:
            return jsonify({"status": "error", "message": "Insufficient balance"}), 400
        
        user.balance = new_balance
        db.session.commit()
        session['user']['balance'] = new_balance
        session.modified = True

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
    user = User.query.get(user_data['id'])
    print(user_data)
    return render_template('dashboard/dashboard.html', user=user.to_dict())

@app.route("/coins")
@login_required
def coins():
    user_data = session['user']
    user = User.query.get(user_data['id'])
    print(user_data)
    return render_template('dashboard/coins.html', user=user.to_dict())

@app.route("/games")
@login_required
def gamesdashboard():
    user_data = session['user']
    user = User.query.get(user_data['id'])
    print(user_data)
    return render_template('dashboard/games.html', user=user.to_dict())

@app.route("/logout")
def logout():
    session.pop('user', None)
    # flash('You have been logged out.', 'success')
    return redirect(url_for('login'))

@app.route("/game-roll-em-die")
@login_required
def roll_em_die():
    user_data = session['user']
    user = User.query.get(user_data['id'])
    print(user_data)
    return render_template('games/roll-dice.html', user=user.to_dict())

@app.route("/game-blackjack")
@login_required
def blackjack():
    user_data = session['user']
    user = User.query.get(user_data['id'])
    print(user_data)
    return render_template('games/blackjack.html', user=user.to_dict())

@app.route("/game-spin-the-wheel")
@login_required
def spin_the_wheel():
    user_data = session['user']
    user = User.query.get(user_data['id'])
    print(user_data)
    return render_template('games/spin-the-wheel.html', user=user.to_dict())

@app.route("/game-slot-machine")
@login_required
def slot_machine():
    user_data = session['user']
    user = User.query.get(user_data['id'])
    print(user_data)
    return render_template('games/slot-machine.html', user=user.to_dict())

@app.route("/game-color-game")
@login_required
def color_game():
    user_data = session['user']
    user = User.query.get(user_data['id'])
    print(user_data)
    return render_template('games/color-game.html', user=user.to_dict())

@app.route("/game-sic-bo")
@login_required
def sic_bo():
    user_data = session['user']
    user = User.query.get(user_data['id'])
    print(user_data)
    return render_template('games/sic-bo.html', user=user.to_dict())

@app.route("/game-higher-or-lower-card")
@login_required
def higher_lower_card():
    user_data = session['user']
    user = User.query.get(user_data['id'])
    print(user_data)
    return render_template('games/higher-card-lower-card.html', user=user.to_dict())

@app.route("/game-beat-the-dealer")
@login_required
def beat_the_dealer():
    user_data = session['user']
    user = User.query.get(user_data['id'])
    print(user_data)
    return render_template('games/beat-the-dealer.html', user=user.to_dict())

@app.route("/game-coin-flip")
@login_required
def coin_flip():
    user_data = session['user']
    user = User.query.get(user_data['id'])
    print(user_data)
    return render_template('games/flip-coin.html', user=user.to_dict())

@app.route("/game-hang-the-dealer")
@login_required
def hang_the_dealer():
    user_data = session['user']
    user = User.query.get(user_data['id'])
    print(user_data)
    return render_template('games/hang-the-dealer.html', user=user.to_dict())

@app.route("/game-guess-the-number")
@login_required
def guessTheNumber():
    user_data = session['user']
    user = User.query.get(user_data['id'])
    print(user_data)
    return render_template('games/guess-the-number.html', user=user.to_dict())


@app.route("/game-hunger-maze")
@login_required
def hungerMaze():
    user_data = session['user']
    user = User.query.get(user_data['id'])
    print(user_data)
    return render_template('games/maze-game.html', user=user.to_dict())


@app.route("/game-memory-game")
@login_required
def memoryGame():
    user_data = session['user']
    user = User.query.get(user_data['id'])
    print(user_data)
    return render_template('games/memory-game.html', user=user.to_dict())

@app.route("/game-mine-sweeper")
@login_required
def mineSweeper():
    user_data = session['user']
    user = User.query.get(user_data['id'])
    print(user_data)
    return render_template('games/mine-sweeper.html', user=user.to_dict())

@app.route("/game-ping-pong")
@login_required
def pingPong():
    user_data = session['user']
    user = User.query.get(user_data['id'])
    print(user_data)
    return render_template('games/ping-pong.html', user=user.to_dict())


@app.route("/game-rock-paper-scissors")
@login_required
def rockPaperScissors():
    user_data = session['user']
    user = User.query.get(user_data['id'])
    print(user_data)
    return render_template('games/rock-paper-scissors.html', user=user.to_dict())

@app.route("/game-scratch-it")
@login_required
def scratchIt():
    user_data = session['user']
    user = User.query.get(user_data['id'])
    print(user_data)
    return render_template('games/scratch-it.html', user=user.to_dict())

@app.route("/game-bingo")
@login_required
def bingo():
    user_data = session['user']
    user = User.query.get(user_data['id'])
    print(user_data)
    return render_template('games/bingo.html', user=user.to_dict())

@app.route("/game-whack-a-mole")
@login_required
def whackAMole():
    user_data = session['user']
    user = User.query.get(user_data['id'])
    print(user_data)
    return render_template('games/whack-a-mole.html', user=user.to_dict())

@app.route("/game-brick-breaker")
@login_required
def brickBreaker():
    user_data = session['user']
    user = User.query.get(user_data['id'])
    print(user_data)
    return render_template('games/brick-breaker.html', user=user.to_dict())
    

if __name__ == '__main__':
    app.run(debug=True)