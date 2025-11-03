import { expect } from "@playwright/test";

export class PetAssertions {
  static async verifyResponseStatus(
    response: any,
    expectedStatus: number,
    message: string
  ) {
    expect(response.status(), message).toBe(expectedStatus);
  }

  static async verifyPetsArray(pets: any[]) {
    expect(Array.isArray(pets), "Response should be an array").toBe(true);
    expect(pets.length, "Should have at least one pet").toBeGreaterThan(0);
  }

  static async verifyPetData(
    responseBody: any,
    expectedName: string,
    expectedId: number,
    expectedStatus: string
  ) {
    expect(responseBody.name, "Pet name should match").toBe(expectedName);
    expect(responseBody.id, "Pet ID should match").toBe(expectedId);
    expect(responseBody.status, "Pet status should match").toBe(expectedStatus);
  }

  static async verifyPetExists(responseBody: any) {
    expect(responseBody, "Response body should exist").toBeTruthy();
    expect(responseBody.id, "Pet should have an ID").toBeDefined();
    expect(responseBody.name, "Pet should have a name").toBeDefined();
  }

  static async verifyPetDeleted(response: any) {
    expect(response.status(), "Pet should not exist (404 status)").toBe(404);
  }
}
