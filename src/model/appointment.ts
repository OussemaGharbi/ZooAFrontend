import { User } from "./user";

export class Appointment{
    constructor(public date:Date, public description:string, public user:User, public veterinaire:User){}
}