from flask import Flask

from marshmallow import Schema, fields, pre_load, validate, ValidationError

from flask_marshmallow import Marshmallow

from flask_sqlalchemy import SQLAlchemy

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

