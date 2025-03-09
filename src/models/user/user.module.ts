import { Course } from "../cours/cours.module";


export class User {

  constructor(public id: string,
      public name: string,
      public email: string,
      public password: string,
      public courses: Course[],
      public role: string,
      public isIn:boolean
  ) { }
}