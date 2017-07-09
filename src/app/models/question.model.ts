export class Question {
public constructor(
  public week: number,
  public day: number,
  public topic: string,
  public question: string,
  public correct: string,
  public wrong1: string,
  public wrong2: string,
  public wrong3: string = "I don't know",
  public timesCorrect: number = 0,
  public timesIncorrect: number = 0
){}
}
