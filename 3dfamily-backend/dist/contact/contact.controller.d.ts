import { ContactService } from './contact.service';
export declare class ContactController {
    private readonly contactService;
    constructor(contactService: ContactService);
    test(): Promise<{
        message: string;
    }>;
    send(body: {
        phone: string;
        email: string;
        description: string;
    }): Promise<{
        message: string;
    }>;
}
