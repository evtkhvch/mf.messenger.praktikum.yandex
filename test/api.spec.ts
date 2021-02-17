import { environment } from '../src/enviroment/enviroment.js';

let chai = require('chai');
let chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Api', async () => {
    describe('Auth', async () => {
        it('Sign in', () => {
            chai.request(environment.praktikum).post('/auth/signin')
                .send({ login: 'string', password: 'string' })
                .end((err: unknown, res: XMLHttpRequest) => {
                    chai.expect(res).to.have.status(200);
                });
        });
    });
});
