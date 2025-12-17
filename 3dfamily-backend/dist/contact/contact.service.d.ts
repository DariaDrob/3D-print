import { ConfigService } from '@nestjs/config';
export declare class ContactService {
    private configService;
    private transporter;
    constructor(configService: ConfigService);
    sendEmail(data: {
        phone: string;
        email: string;
        description: string;
    }): Promise<void>;
}
