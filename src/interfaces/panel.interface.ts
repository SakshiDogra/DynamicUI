import { FormField } from './form-field.interface';

// contract for Panel
export interface Panel {
    fieldType: string;
    sectionId: string;
    sectionName: string;
    collapsed: boolean;
    collapsable: boolean;
    fields?: Array<any>;
    tabs?: Array<any>;
    isOpen: boolean;
}
