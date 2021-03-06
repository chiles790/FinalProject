export class Pitmaster {
  id: number;
  firstName: string;
  lastName: string;
  description: string;
  image: string;

  constructor(
  id?: number,
  firstName?: string,
  lastName?: string,
  description?: string,
  image?: string,
  ){
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.description = description;
    this.image = image;
  }
}
