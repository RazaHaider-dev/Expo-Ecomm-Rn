const express = require('express')
const Stripe =require('stripe')


const app = express();
const port=3000;
const Publish_Key="pk_test_51Q5rrP02JvT4Fn9oqaMvleM1SKNFBrPhKGVqR6OpGEvX5HnBi8JO5XnCNaFBSKstmfAPHe9sDzW2ROgXIZmN12TD005SVhNCja"
const Secret_Key = "sk_test_51Q5rrP02JvT4Fn9o7dMG3nRIFsy6PUKyfyX2OFIhXfB0k3RaPd03IdATg4UdnB5lThYT8SNHqj7GsCOzCsM8SjZX00FePK4Fid"

const stripe = Stripe(Secret_Key,{apiVersion:"2024-09-30.acacia"})


app.listen(port,()=>{
    console.log(`Server Running at port ${port}`);
    
})

app.post("/create-payment-intnet",async(req,res)=>{
    try{
const paymentIntent = await stripe.paymentIntent.create(
    {
        amount:1099,
        currency:"usd",
        // payment_method_types:['card']
    }
)
const clientSecrets = paymentIntent.client_secret;
res.json({
    clientSecret:clientSecrets

})
    }catch(e){
console.log(e);
res.json({error:e.message})

    }
})
