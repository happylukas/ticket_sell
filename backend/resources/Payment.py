from flask import request

from flask_restful import Resource

from Model import db, Transactions, TransactionsSchema, Tickets, TicketsSchema, Secret, SecretSchema

import stripe

import json

from datetime import datetime

transactions_schema = TransactionsSchema(many=True)

transaction_schema = TransactionsSchema()

# stripe_keys = {
#     'secret_key': 'sk_test_51Gq1vjDV8v3FnDVTeEEo3y6tf2pG8sbXMRAct1K0UdUawjSsL0vpAtRL4Nva3ZrOS1YjKjTbElMGpDcqAwT76sYQ00R38KjW2g',
#     'publishable_key': 'pk_test_51Gq1vjDV8v3FnDVTpqIoQaEbtT0XxDH6lRnukoqmVSToojBoFH0MfwBB5TRiUHk7BtmyjpoAJdZPmmQ1H1Cv8OVt00lSu4p0Tf'
# }

# stripe_keys = {
#     'secret_key': 'sk_test_kQ8MMDpUdEe1nyt7zYefLjKe00OwOeGvR5',
#     'publishable_key': 'pk_test_ero0ONRwWP2CDLMsXwXuDKfv00N2bZoiVZ'
# }

# stripe.api_key = stripe_keys['secret_key']


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


class PaymentResource(Resource):

    @staticmethod

    def post():

        json_data = request.get_json(force=True)
        if not json_data:

            return {'message': 'No input data provided'}, 400

        secret = Secret.query.all()

        secret_data = convert_park_to_dict(secret[0], Tickets)
        print(secret_data['secret_key'])

        stripe_keys = {
            'secret_key': secret_data['secret_key'],
            'publishable_key': secret_data['public_key']
        }

        stripe.api_key = stripe_keys['secret_key']

        response = json.dumps(json_data)

        data = transaction_schema.loads(response)

        customer = stripe.Customer.create(
            email=data['email'],
            source=data['token']
        )

        created_data = stripe.Charge.create(
            customer=customer.id,
            amount=data['amount'],
            currency='MXN',
            description=data['description']
        )

        if created_data['status'] == 'succeeded':

            transaction = Transactions(
                firstname=data['firstname'],
                lastname=data['lastname'],
                phone=data['phone'],
                email=data['email'],
                amount=data['amount'],
                description=data['description'],
                ticket_number=data['ticket_number'],
                token=data['token'],
                created_at=datetime.now()
            )

            db.session.add(transaction)

            db.session.commit()

            if(data['ticket_number']):

                ticket = Tickets.query.filter_by(ticket_number=data['ticket_number']).first()

                ticket.ticket_status = 1

                db.session.commit()

            return {'status': 'success', 'data': created_data}, 200

