import { Injectable } from '@nestjs/common';
import * as sgmail from '@sendgrid/mail';

@Injectable()
export class TwilioEmailService {
    MODULENAME = "TwilioEmailService";
    constructor() {}
    TwilloSendEmail(data) {
      
        sgmail.setApiKey(process.env.SENDGRID_API_KEY)
       
        const msg = {
            to : [data.to,data.to1],
            from : data.from,
            subject : data.subject,
            text : data.text,
            html : "<strong>Easy to do anywhere, event with node js</strong>"
        }
        sgmail.send(msg);
        
    }
}
