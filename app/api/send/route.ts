
import GithubAccessTokenEmail from '../../components/email-template';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';


export async function GET() {
    const resend = new Resend(process.env.RESEND_API_KEY);



    try {
        const {data} = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'stackecommerce@gmail.com',
            subject: 'Hello World',
            react: GithubAccessTokenEmail({ username: 'alanturing' }),
        });
        return NextResponse.json({ data });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}