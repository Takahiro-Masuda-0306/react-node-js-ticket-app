// import { useEffect, useState } from "react";
// import StripeCheckout from "react-stripe-checkout";
// import Link from "next/link";
// import useRequest from "../../hooks/use-request";
// import Router from 'next/router';

// const OrderShow = ({ order, currentUser }) => {
//   const [timeLeft, setTimeLeft] = useState(0);
//   const { doRequest, errors } = useRequest({
//     url: "/api/payments",
//     method: "get",
//     body: {
//       orderId: order.id,
//     },
//     onSuccess: () => Router.push('/orders'),
//   });

//   useEffect(() => {
//     const findTimeLeft = () => {
//       const msLeft = new Date(order.expiresAt) - new Date();
//       setTimeLeft(Math.round(msLeft / 1000));
//     };

//     findTimeLeft();
//     const timerId = setInterval(findTimeLeft, 1000);

//     return () => {
//       clearInterval(timerId);
//     };
//   }, [order]);

//   if (timeLeft < 0) {
//     return (
//       <div>
//         チケット購入可能時間を過ぎました。
//         <Link href="/">
//           <a>トップページに戻る</a>
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div>
//       チケットが購入可能時間は残り{timeLeft}秒です。
//       <StripeCheckout
//         token={({ id }) => console.log(doRequest({ token: id }))}
//         stripeKey="pk_test_51I4IKBJNfHUozL8UEf0zeg1z4wCR0FYP2fhNW7V2SWFOguT1Jw6fEm5SEo7MyNg8f4RJc468ZQ9JQs8ilffNV2dN00ITnpFMRT"
//         amount={order.ticket.price * 100}
//         email={currentUser.email}
//       />
//     </div>
//   );
// };

// OrderShow.getInitialProps = async (context, client) => {
//   const { orderId } = context.query;
//   const { data } = await client.get(`/api/orders/${orderId}`);

//   return { order: data };
// };

// export default OrderShow;

import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id,
    },
    onSuccess: () => Router.push('/orders'),
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  if (timeLeft < 0) {
    return <div>Order Expired</div>;
  }

  return (
    <div>
      Time left to pay: {timeLeft} seconds
      <StripeCheckout
        token={({ id }) => doRequest({ token: id })}
        stripeKey="pk_test_51I4IKBJNfHUozL8UEf0zeg1z4wCR0FYP2fhNW7V2SWFOguT1Jw6fEm5SEo7MyNg8f4RJc468ZQ9JQs8ilffNV2dN00ITnpFMRT"
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
      {errors}
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;
