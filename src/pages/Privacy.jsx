import React from 'react'
import AboutVisual from '../components/AboutVisual'

const Privacy = () => {
  return (
    <div>
      <section className="hero hero--mini">
        <div className="hero-content">
          <h1 className="hero-title">Privacy Policy</h1>
          <p className="hero-subtitle">
            How we handle your data
          </p>
        </div>
      </section>

      <div className="container">
        <section className="about">
          <div className="about-content">
            <div className="about-text">
              <p><strong>Last updated:</strong> October 19, 2025</p>
              
              <h2>Introduction</h2>
              <p>
                Your privacy and trust are important to AionScript. This Privacy Policy explains what information we collect, how we use and protect it, and your choices regarding your information. AionScript is designed as a local-first, privacy-focused platform – most of our tools run on your own machine, and we intentionally minimize the data we collect from you. By using the AionScript website or services, you agree to the collection and use of information as described in this Policy.
              </p>

              <h2>Information We Collect</h2>
              <h3>Personal Information You Provide</h3>
              <p>We collect personal information that you choose to give us. This may include:</p>
              <ul>
                <li><strong>Contact Information:</strong> If you subscribe to our updates or beta programs, or contact us through our site, we may collect your name, email address, company/organization, or other information you provide. For example, if you sign up to receive AionScript news, we will collect your email address.</li>
                <li><strong>Account Information:</strong> If in the future we offer cloud services requiring an account, we may collect information like username, password, and any profile details you provide when registering.</li>
                <li><strong>Communications:</strong> If you email us or send us a message, we will collect the information you provide in those communications.</li>
              </ul>
              <p>
                We aim to collect only what is necessary. In fact, currently the only personal data we actively collect might be an email address for mailing list subscriptions and any info you send us via the contact form.
              </p>

              <h3>Information from Your Use of the Services</h3>
              <ul>
                <li><strong>Local Usage Data:</strong> When you use our open-source CLI or SDK on your own systems, AionScript does not receive or collect your content or usage data from those tools by default. Your .aion files and .sJson outputs stay on your machine unless you choose to send them to us.</li>
                <li><strong>Service Usage Data:</strong> If you use an online AionScript service (such as AionScript Cloud™ once available), we may log certain information about your requests for operational purposes. For example, if you send data to a cloud API for processing, our servers will naturally receive the data you transmit. We may log metadata like request timestamps, sizes, and usage frequency to monitor service health and prevent abuse.</li>
                <li><strong>Website Usage Data:</strong> When you visit our website, we may automatically collect basic analytics information such as your IP address, browser type, pages visited, and the date/time of your visit. We do this to understand overall visitor behavior and improve our website. We do not use this data to identify you, and any analytics data are typically aggregated. We may use third-party analytics tools that set their own cookies, as described below.</li>
              </ul>

              <h2>Cookies and Similar Technologies</h2>
              <p>Our website uses cookies or similar technologies sparingly. We may use cookies for:</p>
              <ul>
                <li>Basic functionality (e.g., remembering that you have seen a notification or to keep you logged in if accounts are enabled).</li>
                <li>Analytics to help us understand how people use our site. For example, we might use Google Analytics or a similar tool, which would place cookies to collect usage data. These analytics cookies gather information in an anonymized way.</li>
              </ul>
              <p>
                We do not use cookies for advertising or to track you across other sites. You can control cookie preferences through your browser settings, and you can opt out of analytics cookies by using browser-based opt-out tools or by declining non-essential cookies if prompted.
              </p>

              <h2>How We Use Your Information</h2>
              <p>We use the information we collect for purposes including:</p>
              <ul>
                <li><strong>Providing and Maintaining the Services:</strong> We process your data to operate the AionScript platform and deliver features you request. For example, if you send a .aion file to our cloud API, we use the data in that file to generate the corresponding .sJson output and return it to you. If you create an account, we use your credentials to authenticate you and manage your account.</li>
                <li><strong>Communicating with You:</strong> We respond to your inquiries, provide customer support, and send administrative messages (for instance, responding when you contact us via the website).</li>
                <li><strong>Sending Updates and Announcements:</strong> With your consent, we use your contact information to send newsletters or product updates about AionScript's tools and important changes. You can opt out of these communications at any time.</li>
                <li><strong>Improving and Developing the Services:</strong> We analyze usage information (mostly in aggregate form) to debug, enhance performance, and guide development of new features. Understanding how our tools are used helps us make them better.</li>
                <li><strong>Ensuring Security and Preventing Misuse:</strong> We use data (like IP addresses or log-in attempts) to monitor for fraudulent, harmful, or unauthorized activity. This helps us protect the integrity of our platform and our users.</li>
                <li><strong>Legal Compliance:</strong> We may process or retain information as needed to comply with legal obligations, enforce our Terms of Service, or resolve disputes.</li>
              </ul>

              <h2>How We Disclose or Share Information</h2>
              <p>
                AionScript does not sell your personal information to third parties. We also do not share your personal data with third parties for their own marketing purposes. We may disclose information in the following circumstances:
              </p>
              <ul>
                <li><strong>Service Providers:</strong> We use trusted third-party service providers to help us operate and improve the Services (for example, email delivery services for newsletters, or cloud hosting providers for any online services). These providers may process personal data on our behalf and are contractually obligated to protect it and use it only for the purposes we specify.</li>
                <li><strong>Legal Requirements:</strong> We may disclose information if required to do so by law or in response to valid requests by public authorities (e.g., a subpoena or court order).</li>
                <li><strong>Protecting Rights and Safety:</strong> If we believe it's necessary to share information in order to investigate, prevent, or take action regarding potential violations of our Terms of Service, suspected fraud, security threats, or to protect the rights, property, and safety of AionScript, our users, or the public, we may do so.</li>
                <li><strong>Business Transfers:</strong> If AionScript is involved in a merger, acquisition, or asset sale, your information may be transferred to the successor entity. If that happens, we will ensure that the new owner continues to honor the privacy commitments made in this Policy or provide notice and, if required, obtain your consent.</li>
              </ul>
              <p>In all cases, we endeavor to disclose the minimum information necessary and to do so in a responsible manner.</p>

              <h2>Data Security</h2>
              <p>
                We take security seriously. AionScript implements reasonable technical and organizational measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. For example, any sensitive data we store is protected with encryption both in transit and at rest where appropriate, and we limit access to personal data to personnel who need it to operate the service. While we strive to protect your information, no method of transmission over the internet or electronic storage is 100% secure, so we cannot guarantee absolute security. You also play a role in security: if you have an account with us, please keep your account credentials confidential and notify us immediately of any unauthorized use.
              </p>

              <h2>Data Retention</h2>
              <p>We retain personal information only as long as necessary to fulfill the purposes described in this Policy or as required by law. For instance:</p>
              <ul>
                <li>If you subscribe to our newsletter, we will keep your email on file until you unsubscribe or ask us to delete it.</li>
                <li>If you have an account for AionScript services, we will retain your account information while the account is active. If you choose to delete your account, we will delete or anonymize personal data associated with it (except for information we are required to keep for legal or compliance purposes).</li>
                <li>Server logs or analytics data are typically retained for a short period (e.g., a few months) and are used only for troubleshooting and improvement, after which they may be deleted or aggregated.</li>
                <li>Communications you send us (emails, support requests) may be kept for a period to ensure we can follow up properly, but we will not keep them longer than necessary.</li>
              </ul>

              <h2>Your Rights and Choices</h2>
              <p>Depending on your jurisdiction, you may have certain rights regarding your personal information. We honor these rights and provide ways for you to exercise them:</p>
              <ul>
                <li><strong>Access and Correction:</strong> You have the right to request a copy of the personal data we hold about you and to request corrections of any inaccuracies. For example, you can contact us to verify what information we have on file for you (such as your email subscription) and correct it if needed.</li>
                <li><strong>Deletion:</strong> You can request that we delete your personal information. For example, if you want us to remove your email from our mailing list or delete your account information, just let us know. Note that we might need to retain certain information if required by law or for legitimate business purposes, but we'll inform you if so.</li>
                <li><strong>Withdrawal of Consent:</strong> If we rely on your consent to process information (such as for sending marketing emails), you can withdraw that consent at any time. The easiest way is by unsubscribing from emails or contacting us to opt out.</li>
                <li><strong>Objection or Restriction:</strong> You may have the right to object to or request that we restrict processing of your data in certain circumstances. For instance, you can ask that we stop using your data for direct marketing or certain analytics.</li>
                <li><strong>Data Portability:</strong> If applicable, you can ask for a copy of your data in a common, machine-readable format so you can transfer it to another service.</li>
              </ul>
              <p>
                To exercise any of these rights, please contact us (see the Contact section below). We will respond to your request in accordance with applicable law, and will not discriminate against you for exercising your privacy rights.
              </p>

              <h2>International Data Transfers</h2>
              <p>
                AionScript is based in the United States. If you are using our Services from outside the US, be aware that your information may be transferred to and processed on servers in the US or other countries where our service providers operate. We will take steps to ensure that appropriate safeguards are in place to protect your data in accordance with this Policy and applicable laws. For example, if you are in the European Economic Area (EEA) or United Kingdom and we transfer your personal data out of those regions, we will rely on legal transfer mechanisms such as Standard Contractual Clauses or your consent to ensure lawful transfer of your data.
              </p>

              <h2>Children's Privacy</h2>
              <p>
                AionScript's website and services are not directed to children under 13 years of age (or a higher age threshold where applicable). We do not knowingly collect personal information from children. If you are under 13, please do not submit any personal data to us. If we learn that we have collected personal information from a child under the relevant age without verifiable parental consent, we will take steps to delete that information. If you believe a child has provided us with personal data, please contact us so we can take appropriate action.
              </p>

              <h2>Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. If we make material changes, we will post the updated Policy on our site and update the "Last updated" date at the top. For significant changes, we may also provide a more prominent notice (such as a banner on the website or an email notification if you have subscribed to updates). We encourage you to review this Policy periodically to stay informed about how we are protecting your information.
              </p>
              <p>
                Your continued use of AionScript after any changes to this Privacy Policy signifies your acceptance of the updated terms.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have any questions or concerns about this Privacy Policy or our data practices, please contact us. The best way to reach us is via our contact form on the website. You can also email us at <a href="mailto:privacy@aionscript.com">privacy@aionscript.com</a>.
              </p>
              <p>
                We will address your inquiry as soon as possible and do our best to resolve any issues to your satisfaction. Protecting innovation, data, and trust is at the core of what we do, and we welcome your feedback.
              </p>
            </div>
            <AboutVisual />
          </div>
        </section>
      </div>
    </div>
  )
}

export default Privacy
