import request from "supertest";
import app from "../../app";

it("should return 201 status code on successfull signup", async () => {
  return request(app)
    .post("/api/auth/signUp")
    .send({ email: "test@test.com", password: "superstrongpassword" })
    .expect(201);
});
