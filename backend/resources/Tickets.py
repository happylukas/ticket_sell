from flask import request

from flask_restful import Resource
from Model import db, Tickets, TicketsSchema, Secret, SecretSchema

tickets_schema = TicketsSchema(many=True)

ticket_schema = TicketsSchema()

secrets_schema = SecretSchema(many=True)

secret_schema = SecretSchema()

def convert_park_to_dict(park, OBJ):
    park_dict = {}
    for attr in vars(park):
        if attr == '_sa_instance_state':
            continue
        attr_value = getattr(park, attr)
        if isinstance(attr_value, OBJ):
            point_dict = vars(attr_value)
            park_dict[attr] = point_dict
        else:
            park_dict[attr] = attr_value
    return park_dict


class TicketsResource(Resource):

    @staticmethod

    def get():

        tickets = Tickets.query.filter_by(ticket_status=0)
        data = []
        for ticket in tickets:
            data.append(convert_park_to_dict(ticket, Tickets))

        secret = Secret.query.all()

        secret_data = convert_park_to_dict(secret[0], Tickets)
        print(secret_data['ticket_price'])

        return {'status': 'success', 'data': data, 'public_key': secret_data['public_key'], 'ticket_price': secret_data['ticket_price']}, 200