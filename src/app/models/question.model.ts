export class Question {
public constructor(
  public id: number,
  public week: number,
  public topic: string,
  public question: string,
  public correct: string,
  public wrong1: string,
  public wrong2: string,
  public wrong3: string,
  public assessment: boolean
){}
}
