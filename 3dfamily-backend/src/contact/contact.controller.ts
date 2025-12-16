import { Controller, Get, Post, Body } from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
    constructor(private readonly contactService: ContactService) {}


    @Get('test')
    async test() {
        // Вот тут теперь реально отправляем письмо
        await this.contactService.sendEmail({
            phone: '+380 00 000 00 00',
            email: 'test@3dfamilyprint.com',
            description: 'Это тестовое письмо — если ты его получила, значит всё работает идеально! 🚀',
        });

        return {
            message: 'Тестовое письмо отправлено на твой Gmail! Проверь почту прямо сейчас.'
        };
    }


    @Post('send')
    async send(@Body() body: { phone: string; email: string; description: string }) {
        await this.contactService.sendEmail(body);
        return { message: 'Заявка успешно отправлена! Проверь Gmail.' };
    }
}