from flask import request

from flask_restful import Resource

from Model import db, User, UserSchema

import json

users_schema = UserSchema(many=True)

user_schema = UserSchema()


class LoginResource(Resource):

    @staticmethod

    def post():

        json_data = request.get_json(force=True)

        if not json_data:

            return {'message': 'No input data provided'}, 400

        #Validate and deserialize input

        response = json.dumps(json_data)

        data = user_schema.loads(response)

        user = User.query.filter_by(username=data['username']).first()

        if user:

            return {"status": 'success'}, 201