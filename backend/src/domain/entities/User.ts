export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public role: 'admin' | 'employee',
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}
}