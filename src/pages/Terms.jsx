import React from 'react'

const Terms = () => {
  return (
    <div>
      <section className="hero hero--mini">
        <div className="hero-content">
          <h1 className="hero-title">Terms of Service</h1>
          <p className="hero-subtitle">
            Legal terms and conditions for using AionScript
          </p>
        </div>
      </section>

      <div className="container">
        <section className="about">
          <div className="about-content">
            <div className="about-text">
              <p><strong>Last updated:</strong> October 19, 2025</p>
              
              <h2>Acceptance of Terms</h2>
              <p>
                Welcome to AionScript! By accessing or using the AionScript website, software, or services (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). These Terms form a binding legal agreement between you (an individual or entity) and AionScript (referred to as "we," "us," or "our"). If you do not agree with these Terms, you must not use the Services.
              </p>
              <p>
                We may update these Terms from time to time. We will post any modifications on our website and update the "Last updated" date. By continuing to use the Services after changes become effective, you accept the revised Terms.
              </p>

              <h2>Description of the Services</h2>
              <p>AionScript provides a platform for semantic data formats and tools, including:</p>
              <ul>
                <li><strong>AionScript Language Specification:</strong> The .aion language and .sJson structured JSON format, which define an open semantic data standard.</li>
                <li><strong>Open-Source Tooling:</strong> Developer tools such as our Command Line Interface (CLI) and Software Development Kits (SDKs) that are publicly available under open-source licenses.</li>
                <li><strong>Proprietary Engine and Services:</strong> Certain advanced features and services (e.g., AionScript Core API or AionScript Cloud™) that are offered by us as proprietary, managed solutions.</li>
              </ul>
              <p>
                The Services are primarily designed to be local-first and CLI-first, meaning much of the functionality can run on your own systems without sending data to us. Online services (such as future AionScript Cloud offerings) may require an account and network access.
              </p>

              <h2>License to Open-Source Components</h2>
              <p>
                We believe in openness. Our AionScript CLI and SDK are released under the MIT License, a permissive open-source license. This means you are free to use, copy, modify, and distribute those tools in accordance with the MIT License terms. The AionScript language specification (the ".aion" format and ".sJson" format) is provided under the AionScript Open Specification License version 1.0 (AOSL-1.0). AOSL-1.0 allows anyone to implement and use the AionScript specification in their own software, with no approval needed from us. We encourage community adoption and implementations of the open spec.
              </p>
              <p>
                Please note that while the open-source components are free to use, they are provided "as is" without warranties or guarantees, as described in the Disclaimer of Warranties section below.
              </p>

              <h2>Proprietary Services and License</h2>
              <p>
                For any proprietary AionScript services or features (such as the AionScript Core engine, AionScript Cloud™, or managed APIs that we provide), we grant you a limited, non-exclusive, non-transferable, revocable license to access and use those services, solely for your internal business purposes and in accordance with these Terms and any additional terms we provide. You must not attempt to reverse engineer, copy, or create derivative works from our proprietary software or services, except to the extent allowed by law.
              </p>
              <p>
                If a particular service requires creating an account, you must provide accurate information and keep your account credentials secure. You are responsible for all activities that occur under your account. We reserve the right to suspend or terminate your access to proprietary services if you violate these Terms or if necessary to protect our platform.
              </p>

              <h2>User Data and Content</h2>
              <p>
                Using AionScript's local tools, your data (such as content in .aion files or resulting .sJson) remains on your systems by default. We do not automatically collect or access your proprietary data when you use the CLI or SDK on your own infrastructure. If you choose to use an AionScript managed service (for example, sending data to AionScript Cloud for processing), you retain all ownership of your data. We will only use such data as necessary to provide the service back to you, in accordance with our Privacy Policy, and we claim no ownership over your content.
              </p>
              <p>
                You are responsible for ensuring that your use of the Services and your submitted data do not violate any applicable laws or rights of third parties. By submitting any content through our Services, you grant us a license to process and display that content solely for the purpose of providing the Service to you. We do not sell your data or use it for advertising.
              </p>

              <h2>Acceptable Use</h2>
              <p>You agree to use AionScript Services responsibly and for lawful purposes. You will not:</p>
              <ul>
                <li>Use the Services to violate any law or regulation, or to enable others to do so.</li>
                <li>Engage in any activity that is harmful, fraudulent, deceptive, threatening, harassing, or infringing.</li>
                <li>Attempt to disrupt or compromise the integrity or security of the Services, such as by introducing malware or attempting to gain unauthorized access to systems.</li>
                <li>Misuse the open-source tools in a way that violates the MIT License or misuse proprietary services in violation of any usage limits or policies we provide.</li>
                <li>Remove, alter, or obscure any proprietary notices (including copyright or trademark notices) on or in the Services or any output from the Services.</li>
              </ul>
              <p>
                We reserve the right to investigate any suspected violations of this Acceptable Use section. Violations may result in suspension or termination of your access to the Services.
              </p>

              <h2>Intellectual Property Rights</h2>
              <p>
                Except for the open-source components that are licensed to you under MIT or AOSL-1.0, all rights, title, and interest in and to the AionScript Services and content are owned by AionScript or our licensors. This includes the AionScript language design, the Structured JSON (.sJson) data model and transformation system, our proprietary engine and code, the website content, and all trademarks and logos. These are protected by intellectual property laws and treaties. You are not granted any ownership of intellectual property under these Terms, and we reserve all rights not expressly granted.
              </p>
              <p>
                "AionScript" and the AionScript logo are trademarks of Daniel Gurczynski. You may describe your use of AionScript (e.g., saying your project is "built with AionScript") per our Trademark Policy guidelines, but you may not use our name or branding in a way that suggests endorsement or create confusingly similar names or logos without permission.
              </p>
              <p>
                If you provide us with feedback or suggestions about the Services, we may use them without any obligation to you.
              </p>

              <h2>Privacy</h2>
              <p>
                Your privacy is important to us. Our use of personal information is described in our <a href="/privacy">Privacy Policy</a>. In summary, we collect very minimal personal data. For example, we might collect your email address if you sign up for updates, and we use it only to send you product news and important announcements. We do not sell or share your personal data with third parties. Any data that you provide or that we process on your behalf is handled according to the Privacy Policy. By using the Services, you consent to such processing.
              </p>

              <h2>Disclaimer of Warranties</h2>
              <p>
                <strong>Use at Your Own Risk.</strong> The AionScript Services are provided "as is" and "as available". To the fullest extent permitted by law, we disclaim all warranties and representations, express or implied, regarding the Services. This includes any warranties of merchantability, fitness for a particular purpose, non-infringement, and any warranty that the Services will be uninterrupted, error-free, or secure.
              </p>
              <p>
                Because our CLI and SDK are open-source and provided for free, and our proprietary services are in active development, you understand that they may not be free of bugs or errors. You use the AionScript platform at your own discretion and risk. We are not responsible for any loss of data or damage to your systems that results from your use of the Services.
              </p>

              <h2>Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by applicable law, in no event will AionScript or its creators, contributors, or affiliates be liable for any indirect, incidental, special, consequential, or exemplary damages, or for any loss of profits, revenues, data, or business opportunities, even if we have been advised of the possibility of such damages.
              </p>
              <p>
                Our total cumulative liability arising out of or relating to these Terms or the Services will not exceed the amount (if any) you paid to us for use of the Services in the 12 months prior to the claim, or fifty U.S. dollars (USD $50) if no fees were paid. This limitation of liability applies to all causes of action, whether in contract, tort, or otherwise.
              </p>
              <p>
                Some jurisdictions do not allow certain exclusions or limitations of liability, so some of the above may not apply to you. In such cases, our liability is limited to the greatest extent permitted by law.
              </p>

              <h2>Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless AionScript and its officers, directors, employees, and agents from and against any and all claims, liabilities, damages, losses, and expenses (including reasonable attorneys' fees) arising out of or in connection with your use of the Services, your violation of these Terms, or your infringement of any intellectual property or other right of any person or entity.
              </p>

              <h2>Termination</h2>
              <p>
                You may stop using our Services at any time. We also reserve the right to terminate or suspend your access to the Services (in whole or in part) at any time, with or without notice, if you violate these Terms or if we determine that your use poses a security or legal risk to us or to other users. Upon termination, the rights and licenses granted to you under these Terms will end. However, the sections of these Terms that by their nature should survive termination (such as intellectual property rights, disclaimers, and limitations of liability) will remain in effect.
              </p>

              <h2>Governing Law and Dispute Resolution</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of Florida, USA, without regard to its conflict of laws principles. All disputes arising out of or relating to these Terms or the Services that cannot be resolved amicably shall be subject to the exclusive jurisdiction of the state or federal courts located in Florida, and each party consents to such jurisdiction and venue.
              </p>
              <p>
                If you are accessing the Services from outside the United States, you are responsible for complying with local laws.
              </p>

              <h2>Changes to Terms</h2>
              <p>
                We may modify these Terms from time to time. When we do, we will update the "Last updated" date at the top of the Terms and, if the changes are material, we may provide additional notice (such as on our homepage or via email to subscribers). It is your responsibility to review any updated Terms. By continuing to use the Services after any modifications, you agree to the updated Terms.
              </p>

              <h2>Contact Information</h2>
              <p>
                If you have any questions about these Terms or need to contact us for any reason, please reach out via our contact form or email us at <a href="mailto:support@aionscript.com">support@aionscript.com</a>. We value your feedback and will do our best to address your concerns.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Terms
