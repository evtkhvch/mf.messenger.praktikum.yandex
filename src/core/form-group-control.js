export class FormGroupControl {
    constructor(form, state) {
        this.form = form;
        this.state = state;
    }
    initialize() {
        var _a;
        this.initControls();
        this.setButtonStatus();
        (_a = this.form) === null || _a === void 0 ? void 0 : _a.addEventListener('input', this.listen.bind(this), true);
    }
    initControls() {
        const fields = Object.entries(this.state);
        fields.forEach(([field, control]) => {
            if (control.validator) {
                this.setControl(field);
            }
        });
    }
    setControl(field) {
        var _a;
        const input = (_a = this.form) === null || _a === void 0 ? void 0 : _a.querySelector(`#${field}`);
        if (input) {
            input.value = this.state[field].value;
            input.disabled = this.state[field].isDisabled;
        }
    }
    listen(event) {
        var _a;
        const input = event.target;
        const field = input === null || input === void 0 ? void 0 : input.getAttribute('id');
        const validator = (_a = this.state[field]) === null || _a === void 0 ? void 0 : _a.validator;
        if (input) {
            this.state = Object.assign(Object.assign({}, this.state), { [field]: Object.assign(Object.assign({}, this.state[field]), { value: input === null || input === void 0 ? void 0 : input.value }) });
        }
        if (validator === null || validator === void 0 ? void 0 : validator.isValid(input === null || input === void 0 ? void 0 : input.value)) {
            FormGroupControl.setErrorMessage(input, '');
        }
        else {
            FormGroupControl.setErrorMessage(input, validator === null || validator === void 0 ? void 0 : validator.getDescription());
        }
        this.setButtonStatus();
    }
    setButtonStatus() {
        var _a;
        const submit = (_a = this.form) === null || _a === void 0 ? void 0 : _a.querySelector('button[type="submit"]');
        const isFormValid = this.isFormValid();
        if (submit) {
            submit.disabled = !isFormValid;
        }
    }
    static setErrorMessage(field, message) {
        var _a;
        const errorField = (_a = field === null || field === void 0 ? void 0 : field.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector('.error-message');
        if (errorField) {
            errorField.innerText = message;
        }
    }
    isFormValid() {
        return Object.values(this.state).every(item => { var _a; return (_a = item.validator) === null || _a === void 0 ? void 0 : _a.isValid(item.value); });
    }
}
//# sourceMappingURL=form-group-control.js.map