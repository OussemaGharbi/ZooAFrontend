import { User } from "./user";

export class Appointment{
    constructor(public date:Date, public description:string, public user:string, public veterinaire:string){}
}