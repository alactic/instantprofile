import * as jwt from 'jsonwebtoken';
import {SecreytKey} from './constants';

export let retrieveFromToken =  (authorization) => {
    const token = authorization.split('Bearer').join('').trim();
    return  jwt.verify(token, SecreytKey);
};