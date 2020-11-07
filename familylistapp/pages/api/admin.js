
import {AdminAuthMiddleware} from './AuthMiddleware';

export default async function (req, res) {

      let authorized = await AdminAuthMiddleware(req,res);
      return res.json({authorized:authorized})
}