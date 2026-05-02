import { fakerPT_BR as faker } from "@faker-js/faker";
import { 
  AgentRole, 
  AgentStatus, 
  Privilege, 
  ItemType, 
  ItemSize, 
  ItemElement, 
  OrganizationType, 
  OperationScope, 
  RiskLevel, 
  OrderRelationship, 
  OrganizationStatus,
  TeamDesignation,
  TeamStatus
} from "@prisma/client";

export class RandomizerService {
  
  static agent() {
    return {
      name: faker.person.fullName(),
      role: faker.helpers.arrayElement(Object.values(AgentRole)),
      status: faker.helpers.arrayElement(Object.values(AgentStatus)),
      accessLevel: faker.helpers.arrayElement(Object.values(Privilege)),
      lore: faker.lorem.paragraphs(2),
    };
  }

  static occultist() {
    return {
      name: faker.person.fullName(),
      status: faker.helpers.arrayElement(Object.values(AgentStatus)),
      accessLevel: faker.helpers.arrayElement(Object.values(Privilege)),
      lore: faker.lorem.paragraphs(2),
    };
  }

  static item() {
    return {
      name: faker.commerce.productName(),
      type: faker.helpers.arrayElement(Object.values(ItemType)),
      size: faker.helpers.arrayElement(Object.values(ItemSize)),
      accessLevel: faker.helpers.arrayElement(Object.values(Privilege)),
      elements: faker.helpers.arrayElement(Object.values(ItemElement)),
      description: faker.commerce.productDescription(),
      containment: faker.lorem.sentence(),
      extra_notes: faker.lorem.paragraph(),
    };
  }

  static team() {
    return {
      name: `Equipe ${faker.commerce.productAdjective()} ${faker.animal.type()}`,
      designation: faker.helpers.arrayElement(Object.values(TeamDesignation)),
      status: faker.helpers.arrayElement(Object.values(TeamStatus)),
    };
  }

  static organization() {
    return {
      name: faker.company.name(),
      type: faker.helpers.arrayElement(Object.values(OrganizationType)),
      scope: faker.helpers.arrayElement(Object.values(OperationScope)),
      threatLevel: faker.helpers.arrayElement(Object.values(RiskLevel)),
      relationship: faker.helpers.arrayElement(Object.values(OrderRelationship)),
      status: faker.helpers.arrayElement(Object.values(OrganizationStatus)),
      ideology: faker.lorem.paragraph(),
      accessLevel: faker.helpers.arrayElement(Object.values(Privilege)),
    };
  }

  static case() {
    return {
      name: `Caso: ${faker.word.adjective()} ${faker.word.noun()}`,
      description: faker.lorem.paragraphs(2),
      accessLevel: faker.helpers.arrayElement(Object.values(Privilege)),
    };
  }
}
