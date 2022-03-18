import { User } from "./User";
import { Comment } from "./comment";
import { Like } from "./like";

export class Post{
    constructor(public _id:string,public description:string,public image:string, public date:Date,public user:User,public comment:Comment, public like:Like){}
}