import { Component, Props } from '../../core/component.js';
import { Button } from '../../components/button/button.js';
import { EmptyValidator, FormControl, FormState, ValidatorComposer } from '../../core/validator.js';
import { FormGroupControl } from '../../core/form-group-control.js';
import { AuthApi } from '../../api/auth-api.js';
import template from './login.template.js';
import { router } from '../../index.js';

class LoginComponent extends Component {
    private validator: FormGroupControl<LoginFormGroup> | undefined;
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

        this.validator = new FormGroupControl(formElement, formState);
        this.validator.initialize();

        const registrationLink: HTMLFormElement | null = document.querySelector('.login__box .sign__account');

        if (registrationLink) {
            registrationLink.onclick = () => {
                router.go('/registration');
            };
        }

        if (formElement) {
            formElement.onsubmit = (event: Event) => {
                event.preventDefault();
                const { login, pass } = this.validator?.state as LoginFormGroup;

                this.authApi.signIn(login.value, pass.value).then((res) => {
                    if (res.status === 200 || res.status === 400) {
                        router.go('/chat');
                    } else {
                        throw new Error(res.response);
                    }
                }).catch((err) => console.error(err));
            };
        }
    }

    public render(): string {
        return template;
    }
}

export const loginComponent = new LoginComponent({
    button: new Button({
        type: 'submit',
        name: 'Авторизоваться',
        class: 'sign__submit default-button',
    })
});

interface LoginFormGroup extends FormState {
    login: FormControl;
    pass: FormControl;
}
