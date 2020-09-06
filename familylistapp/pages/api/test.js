
import {createConnection} from 'typeorm';
import {User} from '../../entities/user'
import { create } from 'domain';

export default async function (req, res) {
    
    createConnection().then(async connection =>{
        const testUser = new User();
        testUser.name = "Test";
        testUser.email = "test@test.com";
        await connection.manager.save(testUser);
    }).catch(error =>{console.log(error)});
    res.statusCode = 200
    res.json({ name: 'John Doe' })
  }
  