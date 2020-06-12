from flask import request

from flask_restful import Resource

from Model import db, User, UserSchema

import json

users_schema = UserSchema(many=True)

user_schema = UserSchema()


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


class LoginResource(Resource):

    @staticmethod

    def post():

        json_data = request.get_json(force=True)
        if not json_data:

            return {'message': 'No input data provided'}, 400

        #Validate and deserialize input

        response = json.dumps(json_data)

        data = user_schema.loads(response)

        user = User.query.filter_by(username=data['username'], password=data['password']).first()

        if user:

            checked_user = convert_park_to_dict(user, User)

            return {"status": 'success', 'user': checked_user}, 201

        else:

            return {'message': 'Invalid Username or Password'}, 400

