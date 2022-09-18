import { getAllMessage, addMessage } from "../controllers/messagesController.js";

const BASE = '/api/messages';

const messagesRoute = [
  {
    method: 'post',
    route: BASE + '/addMsg',
    handler: (req, res, next) => addMessage(req, res, next)
  },
  {
    method: 'post',
    route: BASE + '/getMsg',
    handler: (req, res, next) => getAllMessage(req, res, next)
  }
];

export default messagesRoute;