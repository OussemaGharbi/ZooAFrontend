import { Comment } from "./comment";
import { Like } from "./like";
import { User } from "./user";


export class Post{
    constructor(public _id:string,public description:string,public image:string, public date:Date,public user:User,public comment:Comment, public like:Like){}
}