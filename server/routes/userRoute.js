const BASE = '/api/auth';
import { getAllUsers, login, register, setAvatar } from "../controllers/usersController.js";

const userRoute = [
  {
    method: 'post',
    route: BASE + '/register',
    handler: (req, res, next) => register(req, res, next)
  },
  {
    method: 'post',
    route: BASE + '/login',
    handler: (req, res) => login(req, res)
  },
  {
    method: 'post',
    route: BASE + '/setavatar/:id',
    handler: (req, res, next) => setAvatar(req, res, next),
  },
  {
    method: 'get',
    route: BASE + '/allusers/:id',
    handler: (req, res, next) => getAllUsers(req, res,next)
  }
]

export default userRoute;