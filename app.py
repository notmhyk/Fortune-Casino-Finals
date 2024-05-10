from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/sign-in")
def login():
    return render_template('login/login.html')

@app.route("/register")
def register():
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

if __name__ == '__main__':
    app.run(debug=True)