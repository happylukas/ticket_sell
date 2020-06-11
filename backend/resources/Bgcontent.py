from flask import request

from flask_restful import Resource

from Model import db, Bgcontent, BgcontentSchema

from flask_cors import cross_origin

import json

bgcontents_schema = BgcontentSchema(many=True)

bgcontent_schema = BgcontentSchema()


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


class BgcontentResource(Resource):

    @staticmethod
    @cross_origin()
    def get():

        bgcontents = Bgcontent.query.all()

        data = []
        for content in bgcontents:
            data.append(convert_park_to_dict(content, Bgcontent))

        return {'status': 'success', 'data': data}, 200