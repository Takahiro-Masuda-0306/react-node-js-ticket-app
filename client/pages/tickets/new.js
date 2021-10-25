import { useState } from "react";
import Router from 'next/router'
import useRequest from "../../hooks/use-request";

const newTicket = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const { doRequest, errors } = useRequest({
    url: '/api/tickets',  
    method: 'post',
    body: {
      title,
      price,
    },
    onSuccess: () => Router.push('/')
  });

  const onSubmit = e => {
    e.preventDefault();
    doRequest();
    setTitle('');
    setPrice('');
  }

  const onBlur = () => {
    const value = parseFloat(price);
    if(isNaN(value)) {
      return;
    }
    setPrice(value.toFixed(2));
  }

  return (
    <div>
      <h1>create a ticket</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>price</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-control"
            onBlur={onBlur}
          />
        </div>
        {errors}
        <button className="btn btn-primary">submit</button>
      </form>
    </div>
  );
};

export default newTicket;
