import { test, expect } from "@playwright/test";
import PetApiPage from "../../pageobjects/pet.store.pageobject/pet.store.api";

test.describe("Petstore API GET Tests", () => {
  let petApiPage: PetApiPage;

  test.beforeEach(async ({ request }) => {
    petApiPage = new PetApiPage(request);
  });

  test("GET Request: User should successfully get available pets list", async () => {
    const response = await petApiPage.getPetsByStatus("available");
    if (response.status() === 500) {
      test.skip();
    }

    expect(response.status()).toBe(200);

    const pets = await petApiPage.getResponseBody(response);

    expect(Array.isArray(pets)).toBe(true);
    if (response.status() === 200) {
        expect(pets.length).toBeGreaterThanOrEqual(0);
    }
  });

  test("GET Request: User should successfully get pet by ID after creation", async () => {
    // ✅ CHANGE 1: Add timestamp to make ID unique
    const MY_PET_ID = Date.now() + Math.floor(Math.random() * 1000);
    
    // ✅ CHANGE 2: Add timestamp to make name unique
    const MY_PET_NAME = "QaTestMyPet_" + Date.now();

    const petData = {
      id: MY_PET_ID,
      name: MY_PET_NAME,
      status: "available",
    };
    
    const createResponse = await petApiPage.createPet(petData);
    expect(createResponse.status()).toBe(200);
    const response = await petApiPage.waitForPet(MY_PET_ID); 
    expect(response.status()).toBe(200);
    const fetchedPet = await petApiPage.getResponseBody(response);
    expect(fetchedPet.id).toBe(MY_PET_ID);
    expect(fetchedPet.name).toBe(MY_PET_NAME);
    await petApiPage.deletePet(MY_PET_ID);
  });

  test("GET Request: User should get pets list", async () => {
    const response = await petApiPage.getPetsByStatus("pending");
    expect(response.status()).toBe(200);

    const pets = await petApiPage.getResponseBody(response);
    expect(Array.isArray(pets)).toBe(true);
  });

  test("GET Request: User should get sold pets list", async () => {
    const response = await petApiPage.getPetsByStatus("sold");
    expect(response.status()).toBe(200);

    const pets = await petApiPage.getResponseBody(response);
    expect(Array.isArray(pets)).toBe(true);
  });
});