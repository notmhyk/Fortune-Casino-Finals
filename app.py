from flask import Flask, render_template, request, session, flash, redirect, url_for, make_response, jsonify
from datetime import timedelta, datetime
from functools import wraps 
from models import db, User
from db_handler import DBHandler
import secrets
from flask_mail import Mail, Message
from base64 import b64encode
from PIL import Image as PILImage
from io import BytesIO

app = Flask(__name__)
app.secret_key = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.permanent_session_lifetime = timedelta(hours=24)

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'stupx04@gmail.com'
app.config['MAIL_PASSWORD'] = 'vqhgrfqhtvpzqhaj'

mail = Mail(app)
db.init_app(app)

db_handler = DBHandler(app)
def b64encode_filter(data):
    return b64encode(data).decode('utf-8')

app.jinja_env.filters['b64encode'] = b64encode_filter

def send_verification_code(email):
    verification_code = secrets.token_hex(4)
    session['verification_code'] = verification_code
    msg = Message('Verification Code', sender=app.config['MAIL_USERNAME'], recipients=[email])
    msg.body = f'Your verification code is: {verification_code}'
    mail.send(msg)

@app.route("/check-email", methods=['POST'])
def check_email():
    data = request.get_json()
    email = data.get('email')
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({'exists': True}), 200
    else:
        return jsonify({'exists': False}), 200

@app.route("/send-otp", methods=['POST'])
def send_otp():
    data = request.get_json()
    email = data.get('email')
    if email:
        send_verification_code(email)
        return jsonify({'message': 'OTP has been sent to your email.'}), 200
    return jsonify({'error': 'Email is required.'}), 400

@app.route("/reset-password", methods=['POST'])
def reset_password():
    data = request.get_json()
    email = data.get('email')
    new_password = data.get('newPassword')
    otp = data.get('otp')

    if otp != session.get('verification_code'):
        return jsonify({'error': 'Invalid OTP.'}), 400

    success = db_handler.reset_password_by_email(email, new_password)  
    if success:
        session.pop('verification_code', None)
        return jsonify({'message': 'Password has been reset successfully.'}), 200
    return jsonify({'message': 'Failed to reset password.'}), 200

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return redirect(url_for('login'))
        response = make_response(f(*args, **kwargs))
        response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0, max-age=0'
        response.headers['Pragma'] = 'no-cache'
        return response
    return decorated_function

@app.route("/update_balance", methods=["POST"])
@login_required
def update_balance():
    user_id = session.get('user_id')
    new_balance = request.json.get('new_balance')
    
    if new_balance is None:
        return jsonify({"status": "error", "message": "No balance provided"}), 400

    user = User.query.get(user_id)
    
    if not user:
        return jsonify({"status": "error", "message": "User not found"}), 404
    
    try:
        user.balance = float(new_balance)
        db.session.commit()
        db_handler.log_action(user_id, f'Updated balance to {new_balance}')
        return jsonify({"status": "success", "new_balance": user.balance})
    except Exception as e:
        db.session.rollback()
        return jsonify({"status": "error", "message": str(e)}), 500


@app.route("/update_balance_vip", methods=["POST"])
@login_required
def update_balance_vip():
    user_id = session.get('user_id')
    new_vip = request.json.get('new_vip')

    if new_vip is None:
        return jsonify({"status": "error", "message": "No VIP status provided"}), 400

    user = User.query.get(user_id)
    
    if not user:
        return jsonify({"status": "error", "message": "User not found"}), 404
    
    try:
        user.vip = new_vip
        db.session.commit()
        db_handler.log_action(user_id, f'User Avails to {new_vip}')
        session['user']['vip'] = new_vip
        session.modified = True
        return jsonify({"status": "success", "new_vip": user.vip})
    except Exception as e:
        db.session.rollback()
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route("/add_balance", methods=["POST"])
@login_required
def add_balance():
    user_id = session.get('user_id')
    points_to_add = request.json.get('added_points')
    
    if points_to_add is None:
        return jsonify({"status": "error", "message": "No points provided"}), 400

    user = User.query.get(user_id)
    
    if not user:
        return jsonify({"status": "error", "message": "User not found"}), 404
    
    try:
        points_to_add = int(points_to_add)
        user.balance += points_to_add
        db.session.commit()
        db_handler.log_action(user_id, f'User wins {points_to_add}')
        return jsonify({"status": "success", "new_balance": user.balance})
    except Exception as e:
        db.session.rollback()
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route("/deduct_points", methods=["POST"])
@login_required
def deduct_points():
    user_id = session.get('user_id')
    points_to_deduct = request.json.get('deducted_points')
    
    if points_to_deduct is None:
        return jsonify({"status": "error", "message": "No points provided"}), 400

    user = User.query.get(user_id)
    
    if not user:
        return jsonify({"status": "error", "message": "User not found"}), 404
    
    try:
        points_to_deduct = int(points_to_deduct)
        new_balance = user.balance - points_to_deduct
        if new_balance < 0:
            return jsonify({"status": "error", "message": "Insufficient balance"}), 400
        
        user.balance = new_balance
        db.session.commit()
        db_handler.log_action(user_id, f'User losses {points_to_deduct}')
        session['user']['balance'] = new_balance
        session.modified = True
        return jsonify({"status": "success", "new_balance": user.balance})
    except Exception as e:
        db.session.rollback()
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/')
def index():
    session.pop('user_id', None)
    return render_template('index.html')

@app.route("/sign-in", methods=["POST", "GET"])
def login():
    if request.method == "POST":
        email = request.form['loginUsername']
        password = request.form['loginPassword']
        user = db_handler.user_login(email, password)
        if user:
            session.permanent = True
            session['user_id'] = user.id  # Only store the user ID in session
            return redirect(url_for('dashboard'))
        else:
            flash('Invalid Username or password', 'error')
            return redirect(url_for('login'))
    return render_template('login/login.html')

@app.route("/register", methods = ["POST", "GET"])
def register():
    if request.method == "POST":
        first_name = request.form['firstName']
        last_name = request.form['lastName']
        age = request.form['age']
        birthday = datetime.strptime(request.form['birthday'], '%Y-%m-%d').date()
        email = request.form['email']
        otp = request.form['otp']
        username = request.form['username']
        password = request.form['password']
        confirm_password = request.form['confirmPassword']

        if confirm_password != password:
            flash('Passwords do not match!', 'error')
            return redirect(url_for('register'))


        if otp != session.get('verification_code'):
            flash('Otp does not match!', 'error')
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
            image=None,
            vip="Non-VIP"
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

@app.route("/dashboard")
@login_required
def dashboard():
    user_id = session['user_id']
    user = User.query.get(user_id)
    if not user:
        return redirect(url_for('login'))
    return render_template('dashboard/dashboard.html', user=user.to_dict())

@app.route("/promotion")
@login_required
def promotion():
    user_id = session['user_id']
    user = User.query.get(user_id)
    if not user:
        return redirect(url_for('login'))
    return render_template('dashboard/promotion.html', user=user.to_dict())

@app.route("/lottery")
@login_required
def lottery():
    user_id = session['user_id']
    user = User.query.get(user_id)
    if not user:
        return redirect(url_for('login'))
    return render_template('dashboard/lottery.html', user=user.to_dict())

@app.route("/coins")
@login_required
def coins():
    user_id = session['user_id']
    user = User.query.get(user_id)
    if not user:
        return redirect(url_for('login'))
    return render_template('dashboard/coins.html', user=user.to_dict())

@app.route("/games")
@login_required
def gamesdashboard():
    user_id = session['user_id']
    user = User.query.get(user_id)
    if not user:
        return redirect(url_for('login'))
    return render_template('dashboard/games.html', user=user.to_dict())

@app.route("/view-profile")
@login_required
def view_profile():
    user_id = session['user_id']
    user = User.query.get(user_id)
    return render_template('dashboard/view-profile.html', user=user.to_dict())


def resize_image(image, base_width):
    img = PILImage.open(BytesIO(image))
    w_percent = (base_width / float(img.size[0]))
    h_size = int((float(img.size[1]) * float(w_percent)))
    img = img.resize((base_width, h_size), PILImage.ANTIALIAS)
    img_io = BytesIO()
    img.save(img_io, format='JPEG')
    img_io.seek(0)
    return img_io.read()

@app.route('/upload', methods=['POST'])
@login_required
def upload():
    if 'image' not in request.files:
        # flash('No file part', 'error')
        return redirect(url_for('view_profile'))
    
    file = request.files['image']
    if file.filename == '':
        # flash('No selected file', 'error')
        return redirect(url_for('view_profile'))
    
    if file:
        image_data = file.read()
        resized_image = resize_image(image_data, 200)
        user_id = session['user_id']
        user = User.query.get(user_id)
        user.image = resized_image
        db.session.commit()
        
        # flash('Image successfully uploaded', 'success')
        return redirect(url_for('view_profile'))

@app.route("/logout")
def logout():
    session.pop('user_id', None)
    return redirect(url_for('login'))

@app.route("/game-roll-em-die")
@login_required
def roll_em_die():
    user_id = session['user_id']
    user = User.query.get(user_id)
    if not user:
        return redirect(url_for('login'))
    return render_template('games/roll-dice.html', user=user.to_dict())

@app.route("/game-blackjack")
@login_required
def blackjack():
    user_id = session['user_id']
    user = User.query.get(user_id)
    if not user:
        return redirect(url_for('login'))
    return render_template('games/blackjack.html', user=user.to_dict())

@app.route("/game-spin-the-wheel")
@login_required
def spin_the_wheel():
    user_id = session['user_id']
    user = User.query.get(user_id)
    if not user:
        return redirect(url_for('login'))
    return render_template('games/spin-the-wheel.html', user=user.to_dict())

@app.route("/game-slot-machine")
@login_required
def slot_machine():
    user_id = session['user_id']
    user = User.query.get(user_id)
    if not user:
        return redirect(url_for('login'))
    return render_template('games/slot-machine.html', user=user.to_dict())

@app.route("/game-color-game")
@login_required
def color_game():
    user_id = session['user_id']
    user = User.query.get(user_id)
    if not user:
        return redirect(url_for('login'))
    return render_template('games/color-game.html', user=user.to_dict())

@app.route("/game-sic-bo")
@login_required
def sic_bo():
    user_id = session['user_id']
    user = User.query.get(user_id)
    if not user:
        return redirect(url_for('login'))
    return render_template('games/sic-bo.html', user=user.to_dict())

@app.route("/game-higher-or-lower-card")
@login_required
def higher_lower_card():
    user_id = session['user_id']
    user = User.query.get(user_id)
    if not user:
        return redirect(url_for('login'))
    return render_template('games/higher-card-lower-card.html', user=user.to_dict())

@app.route("/game-beat-the-dealer")
@login_required
def beat_the_dealer():
    user_id = session['user_id']
    user = User.query.get(user_id)
    if not user:
        return redirect(url_for('login'))
    return render_template('games/beat-the-dealer.html', user=user.to_dict())

@app.route("/game-coin-flip")
@login_required
def coin_flip():
    user_id = session['user_id']
    user = User.query.get(user_id)
    if not user:
        return redirect(url_for('login'))
    return render_template('games/flip-coin.html', user=user.to_dict())

@app.route("/game-hang-the-dealer")
@login_required
def hang_the_dealer():
    user_id = session['user_id']
    user = User.query.get(user_id)
    if not user:
        return redirect(url_for('login'))
    return render_template('games/hang-the-dealer.html', user=user.to_dict())

@app.route("/game-guess-the-number")
@login_required
def guessTheNumber():
    user_id = session['user_id']
    user = User.query.get(user_id)
    if not user:
        return redirect(url_for('login'))
    return render_template('games/guess-the-number.html', user=user.to_dict())


@app.route("/game-hunger-maze")
@login_required
def hungerMaze():
    user_id = session['user_id']
    user = User.query.get(user_id)
    if not user:
        return redirect(url_for('login'))
    return render_template('games/maze-game.html', user=user.to_dict())


@app.route("/game-memory-game")
@login_required
def memoryGame():
    user_id = session['user_id']
    user = User.query.get(user_id)
    if not user:
        return redirect(url_for('login'))
    return render_template('games/memory-game.html', user=user.to_dict())

@app.route("/game-mine-sweeper")
@login_required
def mineSweeper():
    user_id = session['user_id']
    user = User.query.get(user_id)
    if not user:
        return redirect(url_for('login'))
    return render_template('games/mine-sweeper.html', user=user.to_dict())

@app.route("/game-ping-pong")
@login_required
def pingPong():
    user_id = session['user_id']
    user = User.query.get(user_id)
    if not user:
        return redirect(url_for('login'))
    return render_template('games/ping-pong.html', user=user.to_dict())


@app.route("/game-rock-paper-scissors")
@login_required
def rockPaperScissors():
    user_id = session['user_id']
    user = User.query.get(user_id)
    if not user:
        return redirect(url_for('login'))
    return render_template('games/rock-paper-scissors.html', user=user.to_dict())

@app.route("/game-scratch-it")
@login_required
def scratchIt():
    user_id = session['user_id']
    user = User.query.get(user_id)
    if not user:
        return redirect(url_for('login'))
    return render_template('games/scratch-it.html', user=user.to_dict())

@app.route("/game-bingo")
@login_required
def bingo():
    user_id = session['user_id']
    user = User.query.get(user_id)
    if not user:
        return redirect(url_for('login'))
    return render_template('games/bingo.html', user=user.to_dict())

@app.route("/game-whack-a-mole")
@login_required
def whackAMole():
    user_id = session['user_id']
    user = User.query.get(user_id)
    if not user:
        return redirect(url_for('login'))
    return render_template('games/whack-a-mole.html', user=user.to_dict())

@app.route("/game-brick-breaker")
@login_required
def brickBreaker():
    user_id = session['user_id']
    user = User.query.get(user_id)
    if not user:
        return redirect(url_for('login'))
    return render_template('games/brick-breaker.html', user=user.to_dict())

@app.route("/admin-login", methods=["POST", "GET"])
def admin_login():
    session.pop('user_id', None)
    if request.method == "POST":
        username = request.form['usernameAdmin']
        password = request.form['passwordAdmin']
        admin = db_handler.admin_login(username, password)
        if admin:
            session['admin_id'] = admin.id
            return redirect(url_for('admin_dashboard'))
        else:
            # flash('Invalid username or password', 'error')
            return redirect(url_for('admin_login'))
    return render_template('login/admin-login.html')

@app.route("/admin-dashboard")
def admin_dashboard():
    session.pop('user_id', None)
    if 'admin_id' not in session:
        return redirect(url_for('admin_login'))
    logs = db_handler.get_all_logs()
    return render_template('dashboard/admin-dashboard.html', logs=logs)

@app.route("/admin-logout")
def admin_logout():
    session.pop('admin_id', None)
    return redirect(url_for('admin_login'))

if __name__ == '__main__':
    app.run(debug=True)