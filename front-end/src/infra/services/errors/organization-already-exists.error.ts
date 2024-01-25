export class OrganizationAlreadyExistsError extends Error {
  constructor() {
    super('Already exists an organization with the same email');
  }
}
