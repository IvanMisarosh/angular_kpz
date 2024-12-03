export class Customer {
  customerID: number;
  email?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;

  constructor(
    customerID: number,
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string
  ) {
    this.customerID = customerID;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
  }
}
