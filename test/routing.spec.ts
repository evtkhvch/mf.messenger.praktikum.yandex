import { Router } from '../src/core/router';
import { LoginComponent, loginProps } from '../src/pages/login/login';
import { expect } from 'chai';

describe('Routing', async () => {
    it('Router use returns this', () => {
        const router = new Router('.app');

        const use = router.use('/login', LoginComponent, loginProps)

        expect(use).to.be.an.instanceof(Router);
    });

    it('Router use push route', () => {
        const router = new Router('.app');

        router.use('/login', LoginComponent, loginProps);
        const route = router.getRoute('/login');

        expect(router.routes).to.include(route);
    });

    it('Router is singleton', () => {
        const first = new Router('.app');
        const second = new Router('.app');

        expect(first).to.equal(second);
    });
});
