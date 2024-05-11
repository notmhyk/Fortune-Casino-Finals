from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    birthday = db.Column(db.Date, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    balance = db.Column(db.Integer, nullable=False)
    image = db.Column(db.LargeBinary)
    def __init__(self, first_name, last_name, age, birthday, email, username, password, balance, image):
        self.first_name = first_name
        self.last_name = last_name
        self.age = age
        self.birthday = birthday
        self.email = email
        self.username = username
        self.password =  password
        self.balance = balance
        self.image = image