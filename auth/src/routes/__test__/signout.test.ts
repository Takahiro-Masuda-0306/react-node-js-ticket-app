import request from "supertest";
import { app } from "../../app";

it("clear the cookie after signing out", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "testtest",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signout")
    .send({})
    .expect(200);

  console.log(response.get("Set-Cookie"));
});
