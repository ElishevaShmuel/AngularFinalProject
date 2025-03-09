import { Lesson } from "../lesson/lesson.module";

export class Course {
  constructor(
      public id: string,
      public title: string,
      public teacherId: string,
      public description: string,
      public lessons:Lesson[] = [],
      public students: string[] = []
      ) { }
}

