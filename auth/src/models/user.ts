import mongoose from "mongoose";
import { Password } from '../services/password'

interface userAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties
// that UserModel has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: userAttrs): UserDoc;
}

// An interface that describes the properties
// that UserDocuments has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre('save', async function(done) {
  if(this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

userSchema.statics.build = (attrs: userAttrs) => {
  return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };