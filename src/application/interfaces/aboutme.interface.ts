import {Document} from 'mongoose';

export interface Aboutme extends Document {
     profile_image: string;
     cv: string;
    readonly profession: string;
    readonly city: string;
    readonly state: string;
    readonly country: string;
    readonly dob: string;
    readonly short_description: string;
    readonly about_me: string;
    readonly hobby: any;
    readonly education: [{
        name: string;
    }];
    readonly experience: [{
        name: string;
    }];
    readonly skill: [{
        name: string;
    }];

}