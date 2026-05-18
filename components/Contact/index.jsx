"use client";
import ContactsUsHero from './Contacts';
import ContactForm from './ContactForm';
import ContactInformation from './ContactInformation';
import SubscribeCTA from '../Banner/CTA/subscribe';

export default function ContactPage() {
  return (

    <>

      <ContactsUsHero/>
      <ContactInformation/>
      <ContactForm />
      <SubscribeCTA/>
    </>
  );
}
