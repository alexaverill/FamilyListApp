import {createConnection} from 'typeorm';
import {User} from '../../entities/user'
import { create } from 'domain';

export default (req, res) => {
    res.statusCode = 200
  res.json({ name: 'John Doe' })
    // createConnection().then(async connection =>{
    //     const testUser = new User();
    //     testUser.name = "Test";
    //     testUser.email = "test@test.com";
    //     await connection.manager.save(testUser);
    // });
  }
  