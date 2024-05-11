from sqlalchemy.exc import IntegrityError
from flask import flash
from models import User, db

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
            new_user = User(
                first_name=profile.first_name,
                last_name=profile.last_name,
                age=profile.age,
                birthday=profile.birthday,
                email=profile.email,
                username=profile.username,
                password=profile.password,
                balance=profile.balance,
                image=profile.image
            )
            with self.app.app_context():
                self.db.session.add(new_user)
                self.db.session.commit()
            flash('User registered successfully!', 'success')
        except IntegrityError:
            flash('Email address already exists', 'error')

    # Implement the rest of your DBHandler methods similarly

    def close(self):
        with self.app.app_context():
            self.db.session.close()
