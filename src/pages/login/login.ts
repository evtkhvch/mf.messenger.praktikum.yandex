import { Component, Props } from '../../core/component.js';
import { Button } from '../../components/button/button.js';
import { LoginForm } from './components/login-form/login-form.js';
import { EmptyValidator, FormControl, FormState, ValidatorComposer } from '../../core/validator.js';
import { FormValidator } from '../../core/form-validator.js';
import { Router } from '../../core/router.js';
import { AuthApi } from '../../api/auth-api.js';

class LoginComponent extends Component {
    private validator: FormValidator<LoginFormGroup> | undefined;
    private router: Router = new Router('.app');
    private authApi = new AuthApi();

    constructor(public props: Props) {
        super('div', props, 'sign');
    }

    public componentDidMount(): void {
        const formElement: HTMLFormElement | null = document.querySelector('.sign__box.login__box');
        const formState: LoginFormGroup = {
            login: new FormControl('', false, new EmptyValidator()),
            pass: new FormControl('', false, new ValidatorComposer([ new EmptyValidator() ]))
        };

        this.validator = new FormValidator<LoginFormGroup>(formElement, formState);
        this.validator.initialize();

        const registrationLink: HTMLFormElement | null = document.querySelector('.login__box .sign__account');

        if (registrationLink) {
            registrationLink.onclick = () => {
                this.router?.go('/registration');
            }
        }

        if (formElement) {
            formElement.onsubmit = (event: Event) => {
                event.preventDefault();

                const { login, pass } = this.validator?.state as LoginFormGroup;

                this.signIn(login.value, pass.value);
            }
        }
    }

    private async signIn(login: string, password: string): Promise<void> {
        console.log(login, password);
        const res = await this.authApi.signIn(login, password)
        console.log(res);
        if (res.status === 200) {
            this.router?.go('/chat');
        }
    }

    public destroy(): void {
        this.validator?.removeListeners();
    }

    public render(): string {
        return `{{{ loginForm }}}`;
    }
}

export const loginComponent = new LoginComponent({
    loginForm: new LoginForm({
        button: new Button({
            type: 'submit',
            name: 'Авторизоваться',
            class: 'sign__submit default-button',
        }).elementToString
    }).elementToString
});

interface LoginFormGroup extends FormState {
    login: FormControl;
    pass: FormControl;
}
