export class Comment {
  rating: number;
  comment: string;
  author: string;
  date: string;


  constructor(rating: number, comment: string, author: string, date: string) {
    this.rating = rating;
    this.comment = comment;
    this.author = author;
    this.date = date;
  }

}
