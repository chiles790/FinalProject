export class MainDish {
id: number;
name: string;
meatType: string;
description: string;
image: string;

constructor(
  id?: number,
name?: string,
meatType?: string,
description?: string,
image?: string,
){
  this.id = id;
  this.name = name;
  this.meatType = meatType;
  this.description = description;
  this.image = image;
}
}
