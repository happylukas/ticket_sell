from flask import request

from flask_restful import Resource
from Model import db, Transactions, TransactionsSchema

import datetime

transactions_schema = TransactionsSchema(many=True)

transaction_schema = TransactionsSchema()


def convert_park_to_dict(park, OBJ):
    park_dict = {}
    for attr in vars(park):
        if attr == '_sa_instance_state':
            continue
        attr_value = getattr(park, attr)
        if isinstance(attr_value, datetime.date):
            attr_value = attr_value.strftime('%m/%d/%Y')
        if isinstance(attr_value, OBJ):
            point_dict = vars(attr_value)
            park_dict[attr] = point_dict
        else:
            park_dict[attr] = attr_value
    return park_dict


class TransactionsResource(Resource):

    @staticmethod

    def get(role_id):

        print(type(role_id))
        if role_id == '1':
            transactions = Transactions.query.all()
        elif role_id == '2':
            transactions = Transactions.query.filter_by(description='ticket sale')
        else:
            transactions = Transactions.query.filter_by(description='direct')

        data = []
        for transaction in transactions:
            data.append(convert_park_to_dict(transaction, Transactions))
            # print(transaction)

        return {'status': 'success', 'data': data}, 200