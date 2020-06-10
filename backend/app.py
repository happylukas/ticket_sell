from flask import Flask, jsonify
# import stripe
from flask_cors import CORS

app = Flask("__main__")
CORS(app)

# stripe_keys = {
#     'secret_key': 'sk_test_51Gq1vjDV8v3FnDVTeEEo3y6tf2pG8sbXMRAct1K0UdUawjSsL0vpAtRL4Nva3ZrOS1YjKjTbElMGpDcqAwT76sYQ00R38KjW2g',
#     'publishable_key': 'pk_test_51Gq1vjDV8v3FnDVTpqIoQaEbtT0XxDH6lRnukoqmVSToojBoFH0MfwBB5TRiUHk7BtmyjpoAJdZPmmQ1H1Cv8OVt00lSu4p0Tf'
# }
#
# stripe.api_key = stripe_keys['secret_key']


@app.route("/")
def my_index():
    bg_images = ['https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSHITdKqxsnktv1xUJgZmimndbjKGxbfoW0lkhIj_ugwFPpbwk8&usqp=CAU', 'https://image.shutterstock.com/image-photo/buying-movie-tickets-young-people-260nw-148168535.jpg', 'https://image.shutterstock.com/image-photo/bangkok-thailand-feb-1-ideo-260nw-1632578233.jpg']
    return jsonify(bg_images=bg_images)


# @app.route('/charge', method=['POST'])
# def charge():
#     #amount is cents
#     amount = 500
#
#     customer = stripe.Customer.create(
#         email='sweetlovetrue128@gmail.com',
#         source=request.form['stripeToken']
#     )
#
#     stripe.Charge.create(
#         customer=customer.id,
#         amount=amount,
#         currency='usd',
#         description='Ticket Charge'
#     )


app.run(debug=True)
