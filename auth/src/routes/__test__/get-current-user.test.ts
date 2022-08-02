import request from "supertest";
import app from "../../app";

it("should respond with details about the current user", async () => {
  const authResponse = await request(app).post("/api/auth/signUp").send({
    email: "test@test.com",
    password: "password",
  });

  const cookie = authResponse.get("Set-Cookie");

  const response = await request(app)
    .get("/api/auth")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual("test@test.com");
});
