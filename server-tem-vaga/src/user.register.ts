import User from '../../common/user';

export class UserRegister {
  users: User[] = [];

  register(user: User): User {
    var result = null;
    if (this.cpfNotRegistered(user.cpf)) {
      result = new User();
      result.copyFrom(user);
      this.users.push(result);
    }
    return result;
  }

  cpfNotRegistered(cpf: string): boolean {
    return !this.users.find(u => u.cpf == cpf);
  }

  update(user: User): User {
    var result: User = this.users.find(u => u.cpf == user.cpf);
    if (result) result.copyFrom(user);
    return result;
  }

  getUsers(): User[] {
    return this.users;
  }

  delete(cpf: string): boolean {
    var index: number = this.users.findIndex(u => u.cpf == cpf);
    if (index === -1) false;
    this.users.splice(index, 1);
    return true;
  }

  evaluateUser(cpfToEvaluate: string, evaluationValue: number): number {
    var result: User = this.users.find(u => u.cpf == cpfToEvaluate);
    if (result) return result.evaluate(evaluationValue);
    // -1 indicates no user was found for given CPF
    return -1;
  }
}
