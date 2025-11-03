export class PetDataFactory {
  static createPetData(id: number, name: string, status: string) {
    return {
      id,
      name,
      status,
      category: {
        id: 1,
        name: "Dogs",
      },
      photoUrls: ["string"],
      tags: [
        {
          id: 0,
          name: "string",
        },
      ],
    };
  }

  static createMinimalPetData(id: number, name: string, status: string) {
    return {
      id,
      name,
      status,
    };
  }

  static generateRandomPetId(): number {
    return Date.now();
  }

  static generateRandomPetName(prefix: string = "Pet"): string {
    return prefix + "_" + Date.now();
  }
}