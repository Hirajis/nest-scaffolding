import { Injectable } from '@nestjs/common';
import * as Twilio from 'twilio';
import { LogService } from '../logger.service';

@Injectable()
export class TwilioSmsService {
  MODULENAME = 'TwilioSmsService';
  constructor(private logger: LogService) { }
  TwilloSendSMS(data) {

    const accountSid = process.env.Twilio_SMS_ACCSID;
    const authToken = process.env.Twilio_SMS_AUTHTOKEN;
    const client = Twilio(accountSid, authToken);

   
    client.messages

      .create({
        body: 'McAvoy or Stewart? These timelines can get so confusing.',
        from: process.env.Twilio_SMS_FROM,
        to: '+919422700371',
      })
      .then(message => console.log(message.sid, data))
      .catch(err => {

        this.logger.error(`[(${this.MODULENAME})- ${err.message}`)
      });

    //     client.notify.services(notifyServiceSid)
    //         .notifications.create({
    //             toBinding: JSON.stringify({
    //                 binding_type: 'sms', address: data.to,identity:''
    //             }),
    //             body: 'McAvoy or Stewart? These timelines can get so confusing.'
    //         })
    //         .then(message => console.log(message.sid, data))
    //         .catch(err => {
    //             this.logger.error(`[(${this.MODULENAME})- ${err.message}`)
    //         });
    // }
  }
}