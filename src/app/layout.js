"use client";
import "./globals.css";
import Header from "../../components/Header"; //Header components
import Footer from "../../components/Footer";
import ScrollToTop from "../../components/ScrollToTop";
import AccessibilityComp from "../../components/Accessibility/Accessibility";
import CookieConsent from "../../components/Cookies/CookieConsent";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body 
        style={{ overflowX: 'hidden', fontFamily: 'Avenir, AvenirBold', backgroundColor: "white", color:"black", }}
      >          
      
      <Header />
        {children}
      <Footer />
      <CookieConsent/>
      <AccessibilityComp/>
      <ScrollToTop/>
      </body>
    </html>
  );
}






