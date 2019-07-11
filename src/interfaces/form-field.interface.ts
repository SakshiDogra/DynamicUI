// contract for form fields
export interface FormField {
    displayName: string;
    fieldName: string;
    mandatory: boolean;
    required: boolean;
    optional: boolean;
    dataType: string;
}
