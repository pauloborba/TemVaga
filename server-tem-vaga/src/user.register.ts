import User from '../../common/src/User/user';
import { IUser } from '../../common/src/User/user';

export default class UserRegister {
  users: User[] = [];

  constructor() {
    const userIgor = new User('048', 'Igor Simoes', '', '991', 'igor', '123');
    userIgor.setCarLicensePlate('notEmpty');
    // prettier-ignore
    const userTiago = new User('123', 'Tiago Carvalho', '', '991', 'tiago', '123');
    // prettier-ignore
    const userRafael = new User('456', 'Rafael Pereira', '', '991', 'rafael', '123');
    // prettier-ignore
    const userPedro = new User('789', 'Pedro Buarque', '', '991', 'pedro', '123');

    this.users = [userIgor, userTiago, userRafael, userPedro];
  }

  register({ cpf, name, photo, telephone, email, password }: IUser): User {
    var result = null;
    if (this.isAlreadyRegistered(cpf, email)) {
      result = new User(cpf, name, photo, telephone, email, password);
      this.users.push(result);
    }
    return result;
  }

  isAlreadyRegistered(cpf: string, email: string): boolean {
    return !this.users.find(u => u.cpf === cpf || u.email === email);
  }

  // update(user: User): User {
  //   var result: User = this.users.find(u => u.cpf == user.cpf);
  //   if (result) result.copyFrom(user);
  //   return result;
  // }

  insertRegisteredRide(cpf: string, rideId: string): User {
    const result: User = this.users.find(u => u.cpf === cpf);
    if (result) result.insertRegisteredRide(rideId);
    return result;
  }

  removeRegisteredRide(cpf: string, rideId: string): User {
    const result: User = this.users.find(u => u.cpf === cpf);
    if (result) result.removeRegisteredRide(rideId);
    return result;
  }

  insertRequestedRide(cpf: string, rideId: string): User {
    const result: User = this.users.find(u => u.cpf === cpf);
    if (result) result.insertRequestedRide(rideId);
    return result;
  }

  removeRequestedRide(cpf: string, rideId: string): User {
    const result: User = this.users.find(u => u.cpf === cpf);
    if (result) result.removeRequestedRide(rideId);
    return result;
  }

  getUser(cpf: string): User {
    var result: User = this.users.find(u => u.cpf == cpf);
    return result;
  }

  getUserByLogin(email: any, password: any): User {
    const result: User = this.users.find(u => u.email === email);
    if (result && result.password === password) return result;

    return null;
  }

  getUsers(cpfs: any): User[] {
    var cpfSet: Set<string>;
    if (typeof cpfs === 'string') {
      cpfSet = new Set();
      cpfSet.add(cpfs);
    } else {
      cpfSet = new Set(cpfs);
    }
    const result: User[] = this.users.filter(r => cpfSet.has(r.cpf));
    return result;
  }

  getAllUsers(): User[] {
    return this.users;
  }
  //Maybe return index
  delete(cpf: string): number {
    var index: number = this.users.findIndex(u => u.cpf == cpf);
    if (index !== -1) this.users.splice(index, 1);
    return index;
  }

  evaluateUser(cpfToEvaluate: string, evaluationValue: number): number {
    var result: User = this.users.find(u => u.cpf == cpfToEvaluate);
    if (result) return result.evaluate(evaluationValue);
    // -1 indicates no user was found for given CPF
    return -1;
  }
}
