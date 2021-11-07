import { axiosInstance } from '../axios'
import crypto from 'crypto';

import { MOMO_CREATE } from '../baseApi'

export default {
    async createMomoPaymentRequest(amount, requestId, orderInfo, orderId) {
        const signedStr = `accessKey=${process.env.VUE_APP_MOMO_ACCESS_KEY}&amount=${amount}&extraData=eyJ1c2VybmFtZSI6ICJtb21vIn0=&ipnUrl=${process.env.VUE_APP_MOMO_IPN_URL}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${process.env.VUE_APP_MOMO_PARTNER_CODE}&redirectUrl=${process.env.VUE_APP_MOMO_REDIRECT_URL}&requestId=${requestId}&requestType=captureWallet`

        const signature = crypto.createHmac('sha256', process.env.VUE_APP_MOMO_SECRET_KEY)
                                .update(signedStr)
                                .digest('hex');

        const requestObj = {
            "partnerCode": process.env.VUE_APP_MOMO_PARTNER_CODE,
            "requestType": "captureWallet",
            "ipnUrl": process.env.VUE_APP_MOMO_IPN_URL,
            "redirectUrl": process.env.VUE_APP_MOMO_REDIRECT_URL,
            "orderId": orderId,
            "amount": amount,
            "lang":  "vi",
            "orderInfo": orderInfo,
            "requestId": requestId,
            "extraData": "",
            "signature": signature
        }
        
        const res = await axiosInstance.post(MOMO_CREATE, requestObj)
        console.log(res)
    }
}