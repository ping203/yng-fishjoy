import { Application } from 'egg';

export default (app:Application)=>{
    const controller = app.controller;
    app.router.get('/news', controller.user.login);
}