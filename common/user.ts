export class User {
  cpf: string;
  name: string;
  photo: string;
  telephone: string;
  email: string;
  password: string;
  carLicensePlate: string;

  constructor() {
    this.clean();
  }

  clean(): void {
    this.cpf = '';
    this.name = '';
    this.photo = '';
    this.telephone = '';
    this.email = '';
    this.password = '';
    this.carLicensePlate = '';
  }

  clone(): User {
    var user: User = new User();
    user.copyFrom(this);
    return user;
  }

  copyFrom(from: User): void {
    this.cpf = from.cpf;
    this.name = from.name;
    this.photo = from.photo;
    this.telephone = from.telephone;
    this.email = from.email;
    this.password = from.password;
    this.carLicensePlate = from.carLicensePlate;
  }
}
