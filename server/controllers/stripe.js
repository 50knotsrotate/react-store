module.exports = {
    purchase: function (req, res) { 
        const stripeToken = req.body.stripeToken;
        console.log(stripeToken)
        console.log('purchased')
    }
}
