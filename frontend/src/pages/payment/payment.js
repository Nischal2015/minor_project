import Button from "../../components/UI/Button/Button";

import KhaltiCheckout from "khalti-checkout-web";
import axios from "axios";

const verifyPayment = async(token, amount) =>{
    try {
        const request = await axios.post("/api/khaltiPayment/",{token, amount},  )
        console.log("success")
    }
    catch(error){
        console.log(error)
        console.log("error")
    }
}

let config = {
    // replace this key with yours
    "publicKey": "test_public_key_0f04b9bc00614f89b7746a139d9fa052",
    "productIdentity": "1234567890",
    "productName": "Drogon",
    "productUrl": "http://gameofthrones.com/buy/Dragons",
    "eventHandler": {
        onSuccess (payload) {
            // hit merchant api for initiating verfication
            console.log(payload);
            verifyPayment(payload.token, payload.amount)
            
        },
        // onError handler is optional
        onError (error) {
            // handle errors
            console.log(error);
        },
        onClose () {
            console.log('widget is closing');
        }
    },
    "paymentPreference": ["KHALTI", "EBANKING","MOBILE_BANKING", "CONNECT_IPS", "SCT"],
};

const Payment = () => {
    let checkout = new KhaltiCheckout(config);

    return (<Button id= "payment-button"
        onClick={
            ( ) => {
                checkout.show({amount: 1000});
            }
        }>
            Pay me</Button>);
    // let btn = document.getElementById("payment-button");
    // btn.onclick = function () {
    // // minimum transaction amount must be 10, i.e 1000 in paisa.
    //     checkout.show({amount: 1000});
    // }
}

export default Payment;