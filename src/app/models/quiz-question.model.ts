export class QuizQuestion {
  public constructor(
    public id: string,
    public answer: string = null,
    public correct: boolean = null
  ){}
}
