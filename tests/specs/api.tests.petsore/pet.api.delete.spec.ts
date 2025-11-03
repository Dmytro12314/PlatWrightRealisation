import { test, expect } from "@playwright/test";
import PetApiPage from "../../pageobjects/pet.store.pageobject/pet.store.api";

test.describe("Petstore API DELETE Tests", () => {
  let petApiPage: PetApiPage;

  test.beforeEach(async ({ request }) => {
    petApiPage = new PetApiPage(request);
  });

  test("DELETE Request: User should successfully delete a pet ", async () => {
    const MY_PET_ID = Date.now() + Math.floor(Math.random() * 1000);
    const MY_PET_NAME = "QaTestMyPet_" + Date.now();

    const petData = {
      id: MY_PET_ID,
      name: MY_PET_NAME,
      status: "available",
    };
    const createResponse = await petApiPage.createPet(petData);
    expect(createResponse.status()).toBe(200);

    const createdPet = await petApiPage.getResponseBody(createResponse);
    expect(createdPet.id).toBe(MY_PET_ID);

    const deleteResponse = await petApiPage.deletePet(MY_PET_ID);

    expect([200, 404]).toContain(deleteResponse.status());

    const getResponse = await petApiPage.waitForPetDeletion(MY_PET_ID);
    expect(getResponse.status()).toBe(404);
  });
});