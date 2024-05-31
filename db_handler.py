from sqlalchemy.exc import IntegrityError
from flask import flash, redirect, url_for, render_template
from models import User, Admin, Log, db
from werkzeug.security import check_password_hash, generate_password_hash

class DBHandler:
    def __init__(self, app):
        self.app = app
        self.db = db
        self.init_db()

    def init_db(self):
        with self.app.app_context():
            self.db.create_all()

    def insert_account(self, profile):
        try:
            existing_user = User.query.filter_by(email=profile.email).first()
            if existing_user:
                flash('Email address already exists', 'error')
                return False
            hashed_password = generate_password_hash(profile.password)
            new_user = User(
                first_name=profile.first_name,
                last_name=profile.last_name,
                age=profile.age,
                birthday=profile.birthday,
                email=profile.email,
                username=profile.username,
                password=hashed_password,
                balance=profile.balance,
                image=profile.image,
                vip= profile.vip
            )
            with self.app.app_context():
                self.db.session.add(new_user)
                self.db.session.commit()
            flash('User registered successfully!', 'success')
            return True
        except IntegrityError:
            flash('An error occurred while registering the user.', 'error')
            return None

    def user_login(self, email, password):
        try:
            existing_user = User.query.filter_by(email=email).first()
            if existing_user and check_password_hash(existing_user.password, password):
                return existing_user
            else:
                flash('Incorrect email or password', 'error')
                return None
        except IntegrityError:
            flash('An error occurred while logging in the user.', 'error')
            return None
        
    def reset_password_by_email(self, email, new_password):
        user = User.query.filter_by(email=email).first()
        hashed_password = generate_password_hash(new_password)
        if user:
            user.password = hashed_password  
            self.db.session.commit()
            return True
        else:
            flash('Email not found. Password update failed.', 'error')
            return False
        
    def admin_login(self, username, password):
        try:
            existing_admin = Admin.query.filter_by(username=username).first()
            if existing_admin:
                return existing_admin
            else:
                flash('Incorrect username or password', 'error')
                return None
        except IntegrityError:
            flash('An error occurred while logging in the admin.', 'error')
            return None

    def log_action(self, user_id, action):
        new_log = Log(user_id=user_id, action=action)
        with self.app.app_context():
            self.db.session.add(new_log)
            self.db.session.commit()

    def get_all_logs(self):
        return Log.query.order_by(Log.timestamp.desc()).all()

    def reset_password_by_email(self, email, new_password):
        user = User.query.filter_by(email=email).first()
        hashed_password = generate_password_hash(new_password)
        if user:
            user.password = hashed_password
            self.db.session.commit()
            return True
        else:
            flash('Email not found. Password update failed.', 'error')
            return False

    def close(self):
        with self.app.app_context():
            self.db.session.close()
