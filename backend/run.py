from flask import Flask

from flask_cors import CORS


def create_app(config_filename):

    app = Flask(__name__)

    # CORS(app)
    #
    # cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

    app.config.from_object(config_filename)

    from app import api_bp

    app.register_blueprint(api_bp, url_prefix='/')

    # app.register_blueprint(template_bp, url_prefix='/')

    from Model import db

    db.init_app(app)

    return app


if  __name__ == "__main__":

    app = create_app("config")

    app.run(host='localhost', debug=True)
