export interface ConfigDetails {
    viewDetails: ViewList;
    viewType: string;
}

export interface ViewList {
    appId: string;
    appName: string;
    configId: string;
    configName: string;
    userRoleId: string;
    userRole: string;
    createdByID: string;
    createdBy: string;
    creationDate: string;
    active?: boolean;
}

export interface Response {
    views?: ViewList[];
}

export interface MetaDataList {
    data: MetaData;
}

export interface MetaData {
    apps?: TypeList[];
    roles?: TypeList[];
}

export interface TypeList {
    code: string;
    value: string;
}
