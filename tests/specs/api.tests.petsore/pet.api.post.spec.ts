import { test, expect } from "@playwright/test";
import PetApiPage from "../../pageobjects/pet.store.pageobject/pet.store.api";

test.describe("Petstore API POST Tests", () => {
  let petApiPage: PetApiPage;

  test.beforeEach(async ({ request }) => {
    petApiPage = new PetApiPage(request);
  });

  test("POST REQUEST: User should successfully create a pet with full data", async () => {
    const MY_PET_ID = Date.now() + Math.floor(Math.random() * 1000);
        const MY_PET_NAME = "QaTestMyPet_" + Date.now();

    const petData = {
      id: MY_PET_ID,
      name: MY_PET_NAME,
      status: "available",
    };

    const response = await petApiPage.createPet(petData);
    expect(response.status()).toBe(200);
    const responseBody = await petApiPage.getResponseBody(response);
    expect(responseBody.name).toBe(MY_PET_NAME);
    expect(responseBody.id).toBe(MY_PET_ID);
    expect(responseBody.status).toBe("available");
    await petApiPage.deletePet(MY_PET_ID);
  });

  test("POST Request: Create pet with (ID and Name)", async () => {
    const MY_PET_ID = Date.now() + Math.floor(Math.random() * 1000);
    const MY_PET_NAME = "QaTestMyPet_" + Date.now();

    const petData = {
      id: MY_PET_ID,
      name: MY_PET_NAME,
    };
    const response = await petApiPage.createPet(petData);
    expect(response.status()).toBe(200);

    const responseBody = await petApiPage.getResponseBody(response);
    expect(responseBody.name).toBe(MY_PET_NAME);
    await petApiPage.deletePet(MY_PET_ID);
  });
});