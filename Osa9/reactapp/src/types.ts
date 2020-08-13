interface Course {
  name: string;
  exerciseCount: number;
}

export interface HeaderProps {
  header: string;
}

export interface ContentProps {
  courses: Array<Course>;
}