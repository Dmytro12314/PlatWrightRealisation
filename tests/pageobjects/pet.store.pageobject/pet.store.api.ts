import { APIRequestContext } from "@playwright/test";

export class PetApiPage {
  private baseUrl: string;
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseUrl = "https://petstore.swagger.io/v2";
  }

  async getPetsByStatus(status: string) {
    const response = await this.request.get(
      `${this.baseUrl}/pet/findByStatus`,
      {
        params: { status },
      }
    );
    return response;
  }

  async createPet(petData: any) {
    const response = await this.request.post(`${this.baseUrl}/pet`, {
      data: petData,
    });
    return response;
  }

  async getPetById(petId: number) {
    const response = await this.request.get(`${this.baseUrl}/pet/${petId}`);
    return response;
  }

  async updatePet(petData: any) {
    const response = await this.request.put(`${this.baseUrl}/pet`, {
      data: petData,
    });
    return response;
  }

  async deletePet(petId: number) {
    const response = await this.request.delete(`${this.baseUrl}/pet/${petId}`);
    return response;
  }

  async getResponseBody(response: any) {
    return await response.json();
  }

  async waitForPet(petId: number, maxRetries: number = 5) {
    for (let i = 0; i < maxRetries; i++) {
      await this.sleep(2000);
      const response = await this.getPetById(petId);
      if (response.status() === 200) {
        return response;
      }
    }
    return await this.getPetById(petId);
  }

  async waitForPetDeletion(petId: number, maxRetries: number = 5) {
    for (let i = 0; i < maxRetries; i++) {
      await this.sleep(2000);
      const response = await this.getPetById(petId);
      if (response.status() === 404) {
        return response;
      }
    }
    return await this.getPetById(petId);
  }

  private sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
export default PetApiPage;
