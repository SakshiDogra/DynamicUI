export class FormFieldModel {
    constructor(
        public displayName: string = '',
        public fieldName: string = '',
        public mandatory: boolean = false,
        public required: boolean = false,
        public optional: boolean = false,
        public dataType: string = '',
        public hidden: boolean = false,
        public value?: string | number,
        public disabled?: boolean,
        public validations?: Validation,
        public selected: boolean = false,
        public fieldType?: string,
        public fieldValue?: string
    ) { }
}

interface Validation {
    maxLength?: number;
    minLength?: number;
    pattern?: string | RegExp;
}
