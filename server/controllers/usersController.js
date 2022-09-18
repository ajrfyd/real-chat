import User from "../models/userModel.js";
import bcrypt from 'bcrypt';

export const register = async (req, res, next) => {
  const { userName, email, password } = req.body;
  try {
    const userNameCheck = await User.findOne({ userName });
    if(userNameCheck) {
      return res.json({ msg: "UserName already used", status: false });
    }
    
    const emailCheck = await User.findOne({ email });
    if(emailCheck) return res.json({ msg: "Email already used", status: false });
  
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
      email,
      userName,
      password: hashedPassword, 
    });
  
    delete user.password;
    return res.json({ status: true, user });
  } catch(e) {
    next(e)
  }
}



export const login = async (req, res, next) => {
  const { userName, password } = req.body;
  try {
    const user = await User.findOne({ userName });
    if(!user) {
      return res.json({ msg: "Incorrect username or password", status: false });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) return res.json({ msg: "Incorrect username or password.", status: false });
    delete user.password;

    
    return res.json({ status: true, user });
  } catch(e) {
    next(e)
  }
}

export const setAvatar = async (req, res, next) => {
  try{
    const { id: userId } = req.params;
    const { image: avatarImage } = req.body;
    const userData = await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage,
    }, {
      new: true
    });
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    })
  } catch(e) {
    next(e);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      'email',
      'userName',
      'avatarImage',
      '_id'
    ]);
    
    return res.json(users);
  } catch(e) {
    next(e);
  }
};

export const logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    // onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
}