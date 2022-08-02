import request from "supertest";
import app from "../../app";

it("should return 201 status code on successfull signup", async () => {
  await request(app)
    .post("/api/auth/signUp")
    .send({ email: "test@test.com", password: "superstrongpassword" })
    .expect(201);
});

it("should return 400 status code with invalid email", async () => {
  await request(app)
    .post("/api/auth/signUp")
    .send({ email: "not_an_email", password: "superstrongpassword" })
    .expect(400);
});

it("should return 400 status code with missing email", async () => {
  await request(app)
    .post("/api/auth/signUp")
    .send({ password: "superstrongpassword" })
    .expect(400);
});

it("should return 400 status code with invalid password (less than 4)", async () => {
  await request(app)
    .post("/api/auth/signUp")
    .send({ email: "test@test.com", password: "abc" })
    .expect(400);
});

it("should return 400 status code with invalid password (more than 20)", async () => {
  await request(app)
    .post("/api/auth/signUp")
    .send({ email: "test@test.com", password: "verylooooooooooooongpd" })
    .expect(400);
});

it("should return 400 status code with missing password", async () => {
  await request(app)
    .post("/api/auth/signUp")
    .send({ email: "test@test.com" })
    .expect(400);
});

it("should return 400 status code with invalid email and password", async () => {
  await request(app)
    .post("/api/auth/signUp")
    .send({ email: "not_an_email", password: "abc" })
    .expect(400);
});

it("should return 400 status code with missing email and password", async () => {
  await request(app).post("/api/auth/signUp").send({}).expect(400);
});

it("should return 400 status code with already existing email", async () => {
  await request(app)
    .post("/api/auth/signUp")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/auth/signUp")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});

it("should set a cookie after successful signup", async () => {
  const response = await request(app).post("/api/auth/signUp").send({
    email: "test@test.com",
    password: "password",
  });

  expect(response.get("Set-Cookie")).toBeDefined();
});
