import mongoose,{Schema,Document} from "mongoose";// for introducing type safety we have used this Document if we havent used type script the no need for it



export interface Message extends Document{ //custom data structure is created to tell type in document
    content:string//in type script we have string in small s.
    createdAt:Date
}

const MessageSchema:Schema<Message>=new Schema({//Schema is basically same as object inside a class so thats how it is created to give a blueprint
  content:{
    type:String,// in mongoose string is capital S but in ts it is samll s.
    required :true
  },
  createdAt:{
    type:Date,
    required :true,
    default:Date.now
  }
})

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date; 
  isVerified: boolean;
  isAcceptingMessages: boolean;
  messages: Message[];
}

// Updated User schema
const UserSchema: Schema<User> = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,//automatically trims spaces if present in username
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/.+\@.+\..+/, 'Please use a valid email address'],//regex to validate email
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  verifyCode: {
    type: String,
    required: [true, 'Verify Code is required'],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, 'Verify Code Expiry is required'],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessages: {
    type: Boolean,
    default: true,
  },
  messages: [MessageSchema],//sice we are defining schema here so type of message will be message schema.
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>('User', UserSchema);

export default UserModel;