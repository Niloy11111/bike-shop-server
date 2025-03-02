import Shurjopay, { PaymentResponse, VerificationResponse } from 'shurjopay';
import config from '../../config';

const shurjopay = new Shurjopay();

shurjopay.config(
  config.sp.sp_endpoint!,
  config.sp.sp_username!,
  config.sp.sp_password!,
  config.sp.sp_prefix!,
  config.sp.sp_return_url!,
);

// console.log(shurjopay);

const makePaymentAsync = async (
  paymentPayload: any,
): Promise<PaymentResponse> => {
  return new Promise((resolve, reject) => {
    console.log('paymentPayload:', paymentPayload);

    // paymentPayload.amount = 5320;
    console.log('Testing with amount:', paymentPayload.amount);
    shurjopay.makePayment(
      paymentPayload,
      // (response) => resolve(response),
      (response) => {
        console.log('ShurjoPay Response:', response); // Log response here
        resolve(response);
      },
      (error) => reject(error),
    );
  });

  //   const paymentResult = await shurjopay.makePayment(
  //     paymentPayload,
  //     (response) => {
  //       sendResponse(res, {
  //         statusCode: 200,
  //         message: "Order placed successfully",
  //         data: response,
  //       });
  //     },
  //     (error) => console.log(error)
  //   );
  //   return paymentResult;
};

const verifyPaymentAsync = (
  order_id: string,
): Promise<VerificationResponse[]> => {
  return new Promise((resolve, reject) => {
    shurjopay.verifyPayment(
      order_id,
      (response) => resolve(response),
      (error) => reject(error),
    );
  });
};

export const orderUtils = {
  makePaymentAsync,
  verifyPaymentAsync,
};
