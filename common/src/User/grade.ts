interface IGrade {
  average: number;
  evaluationQtt: number;
}

export default class Grade {
  average: number;
  evaluationQtt: number;

  constructor(from: IGrade) {
    this.average = from.average;
    this.evaluationQtt = from.evaluationQtt;
  }
  // TODO: Round average
  incrementGrade(newValue: number): number {
    const oldQtt = this.evaluationQtt;

    newValue = this.clampGrade(newValue, 0, 5);
    this.evaluationQtt += 1;

    this.average = (this.average * oldQtt + newValue) / this.evaluationQtt;
    return this.average;
  }

  clampGrade(toClamp, min, max): number {
    // If toClamp is less than min, return min
    // If toClamp is greather than max, return max
    return toClamp <= min ? min : toClamp >= max ? max : toClamp;
  }
}
