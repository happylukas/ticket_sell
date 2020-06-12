from flask import Blueprint

from flask_restful import Api


from resources.Login import LoginResource

from resources.Bgcontent import BgcontentResource

from resources.Tickets import TicketsResource

from resources.Payment import PaymentResource

from resources.Transactions import TransactionsResource

api_bp = Blueprint('api', __name__)

api = Api(api_bp)

api.add_resource(LoginResource, '/login')

api.add_resource(BgcontentResource, '/get_bgcontent')

api.add_resource(TicketsResource, '/get_tickets')

api.add_resource(PaymentResource, '/payment')

api.add_resource(TransactionsResource, '/get_transactions/<role_id>')

