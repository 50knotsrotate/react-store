const Stripe = require("stripe")(process.env.REACT_APP_STRIPE_SK_TEST);

module.exports = {
    purchase: function (req, res) { 
        const stripeToken = req.body.stripeToken;
        console.log(stripeToken)
        console.log('purchased')

        Stripe.charges.create(
          {
            amount: 99,
            currency: "usd",
            description: "Thanks for joining us!",
            source: stripeToken
          },
          function(err, charge) {
            if (err) {
              res.send({
                success: false,
                message: "Error"
              });
            } else {
             
            }
          }
        );
    }
}
