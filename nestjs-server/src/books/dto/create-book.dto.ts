export class CreateBookDto {
	title: string;
	description: string;
	author: string;
	price: number;
	coverImage: string;
	tags: string[]; // Assuming tags can be represented as an array of strings
  }
  