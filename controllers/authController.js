import express from "express";
import { Authenticate, Authorize } from '../utils/authUtils.js';
export const authController = expressRouter()

authController.post('/login', (res, req) => {Authenticate(req, res)})

authController.get('/autorize', Authorize, (req, res, next) => {
    res.send({message: 'You are logged in'})
})