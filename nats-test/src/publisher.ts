import nats from "node-nats-streaming";

console.clear();

const stan = nats.connect("ticket-app", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("publisher connected to NATS");

  const data = JSON.stringify({
    id: "123",
    title: "concert",
    price: 10,
  });

  stan.publish("ticket:created", data, () => {
    console.log("Event published");
  });
});