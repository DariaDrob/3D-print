import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class ContactService {
    private transporter;

    constructor(private configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: this.configService.get<string>('GMAIL_USER'),
                pass: this.configService.get<string>('GMAIL_PASS'),
            },
        });
    }

    async sendEmail(data: { phone: string; email: string; description: string }) {
        try {
            const info = await this.transporter.sendMail({
                from: `"3D Family Print" <${this.configService.get<string>('GMAIL_USER')}>`,
                to: this.configService.get<string>('GMAIL_USER'),
                subject: 'Новая заявка с сайта 3D Family Print',
                text: `Телефон: ${data.phone}\nEmail: ${data.email}\nОписание: ${data.description}`,
                html: `<h2>Новая заявка</h2><p><strong>Телефон:</strong> ${data.phone}</p><p><strong>Email:</strong> ${data.email}</p><p><strong>Описание:</strong><br>${data.description.replace(/\n/g, '<br>')}</p>`,
            });

            console.log('Письмо успешно отправлено! MessageId:', info.messageId);
        } catch (error) {
            console.error('ОШИБКА ОТПРАВКИ ПИСЬМА:', error.message);
            if (error.response) console.error(error.response);
            throw error;
        }
    }
}