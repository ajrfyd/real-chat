const BASE = '/api/auth';
import { login, register } from "../controllers/usersController.js";

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
  }
]

export default userRoute;