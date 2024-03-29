import request from "supertest";
import app from "../../app";

it("should respond with details about the current user", async () => {
  const cookie = await global.signIn();

  const response = await request(app)
    .get("/api/auth")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual("test@test.com");
});
