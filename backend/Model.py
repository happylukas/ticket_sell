from flask import Flask

from marshmallow import Schema, fields, pre_load, validate, ValidationError

from flask_marshmallow import Marshmallow

from flask_sqlalchemy import SQLAlchemy

from datetime import datetime

ma = Marshmallow()

db = SQLAlchemy()


class User(db.Model):

    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)

    username = db.Column(db.String(150), nullable=False)

    password = db.Column(db.String(150), nullable=False)

    role = db.Column(db.Integer, nullable=False)

    def __init__(self, username, password, role):

        self.username = username

        self.password = password

        self.role = role


class Bgcontent(db.Model):

    __tablename__ = 'bgcontent'

    id = db.Column(db.Integer, primary_key=True)

    image = db.Column(db.String(150), nullable=True)

    title = db.Column(db.String(150), nullable=True)

    content = db.Column(db.String(150), nullable=True)

    def __init__(self, image, title, content):

        self.image = image

        self.title = title

        self.content = content


class Tickets(db.Model):

    __tablename__ = 'tickets'

    id = db.Column(db.Integer, primary_key=True)

    ticket_number = db.Column(db.String(150), nullable=True)

    ticket_status = db.Column(db.Integer, nullable=False)

    def __init__(self, ticket_number, ticket_status):

        self.ticket_number = ticket_number

        self.ticket_status = ticket_status


class Transactions(db.Model):

    __tablename__ = 'transactions'

    id = db.Column(db.Integer, primary_key=True)

    firstname = db.Column(db.String(150), nullable=False)

    lastname = db.Column(db.String(150), nullable=False)

    phone = db.Column(db.String(150), nullable=False)

    email = db.Column(db.String(150), nullable=False)

    amount = db.Column(db.Integer, nullable=False)

    description = db.Column(db.String(150), nullable=False)

    ticket_number = db.Column(db.String(150), nullable=False)

    token = db.Column(db.String(150), nullable=False)

    created_at = db.Column(db.DateTime(), default=datetime.utcnow)

    def __init__(self, firstname, lastname, phone, email, amount, description, ticket_number, token, created_at):

        self.firstname = firstname

        self.lastname = lastname

        self.phone = phone

        self.email = email

        self.amount = amount

        self.description = description

        self.ticket_number = ticket_number

        self.token = token

        self.created_at = created_at


class Secret(db.Model):

    id = db.Column(db.Integer, primary_key=True)

    public_key = db.Column(db.String(150), nullable=False)

    secret_key = db.Column(db.String(150), nullable=False)

    ticket_price = db.Column(db.Integer, nullable=False)

    def __init__(self, public_key, secret_key, ticket_price):

        self.public_key = public_key

        self.secret_key = secret_key

        self.ticket_price = ticket_price


class UserSchema(ma.Schema):

    id = fields.Integer(dump_only=True)

    username = fields.String(required=True)

    password = fields.String(required=True)

    role = fields.Integer(dump_only=True)


class BgcontentSchema(ma.Schema):

    id = fields.Integer(dump_only=True)

    image = fields.String(required=False)

    title = fields.String(required=False)

    content = fields.String(required=False)


class TicketsSchema(ma.Schema):

    id = fields.Integer(dump_only=True)

    ticket_number = fields.String(required=True)

    ticket_status = fields.Integer(dump_only=True)


class TransactionsSchema(ma.Schema):

    id = fields.Integer(dump_only=True)

    firstname = fields.String(required=True)

    lastname = fields.String(required=True)

    phone = fields.String(required=True)

    email = fields.String(required=True)

    amount = fields.Integer()

    description = fields.String(required=True)

    ticket_number = fields.String(required=False)

    token = fields.String(required=True)

    created_at = fields.DateTime(required=False)


class SecretSchema(ma.Schema):

    public_key = fields.String(required=True)

    secret_key = fields.String(required=True)

    ticket_price = fields.Integer(dump_only=True)

