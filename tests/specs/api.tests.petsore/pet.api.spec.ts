
import { test, expect } from "@playwright/test";

test("Petstore API - Complete CRUD operations test", async ({ request }) => {
  const baseUrl = "https://petstore.swagger.io/v2";
  const MY_PET_ID = Date.now() + Math.floor(Math.random() * 1000);
  const MY_PET_NAME = "QaTestMyPet_" + Date.now();

  // CREATE - POST Request
  const petData = {
    id: MY_PET_ID,
    name: MY_PET_NAME,
    status: "available",
  };

  const createResponse = await request.post(`${baseUrl}/pet`, {
    data: petData,
  });
  expect(createResponse.status()).toBe(200);

  const createdPet = await createResponse.json();
  expect(createdPet.id).toBe(MY_PET_ID);
  expect(createdPet.name).toBe(MY_PET_NAME);
  expect(createdPet.status).toBe("available");

  // READ - GET Request by ID
  const getResponse = await request.get(`${baseUrl}/pet/${MY_PET_ID}`);
  expect(getResponse.status()).toBe(200);

  const fetchedPet = await getResponse.json();
  expect(fetchedPet.id).toBe(MY_PET_ID);
  expect(fetchedPet.name).toBe(MY_PET_NAME);

  // READ - GET Request by Status
  const statusResponse = await request.get(`${baseUrl}/pet/findByStatus`, {
    params: { status: "available" },
  });
  expect(statusResponse.status()).toBe(200);

  const pets = await statusResponse.json();
  expect(Array.isArray(pets)).toBe(true);

  // DELETE Request
  const deleteResponse = await request.delete(`${baseUrl}/pet/${MY_PET_ID}`);
  expect([200, 404]).toContain(deleteResponse.status());

  // Verify deletion
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const verifyDeleteResponse = await request.get(`${baseUrl}/pet/${MY_PET_ID}`);
  expect(verifyDeleteResponse.status()).toBe(404);
});