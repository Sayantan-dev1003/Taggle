import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
    const navigate = useNavigate();

    const handleOkClick = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-[#f4f4f4] flex items-center justify-center openSans py-4">
            <div className="bg-white shadow-lg rounded-lg mx-4 p-6 w-full max-w-lg text-justify openSans">
                <h1 className="text-2xl montserrat font-bold text-center text-red-600 mb-6">Privacy Policy for Taggle</h1>

                <p className="mb-4">Your privacy is important to us. This Privacy Policy explains how Taggle collects, uses, and protects your information when you use our website and services. By using Taggle, you consent to the practices described in this policy.</p>

                <hr className="my-4" />

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 text-red-600">1. Information We Collect</h2>
                    <ul className="list-disc pl-6">
                        <li><strong>Information You Provide:</strong> When you create an account or use our services, we may collect your name, email address, and any content you share on the platform.</li>
                        <li><strong>Automatically Collected Information:</strong> We gather data such as your device type, browser, and usage patterns through cookies and similar technologies.</li>
                        <li><strong>Third-Party Information:</strong> If you log in via third-party services, we may receive basic profile details as allowed by those platforms.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 text-red-600">2. How We Use Your Information</h2>
                    <ul className="list-disc pl-6">
                        <li>To provide and improve our services.</li>
                        <li>To personalize your experience on the platform.</li>
                        <li>To communicate with you about updates, notifications, or changes to our services.</li>
                        <li>To ensure the security and integrity of the platform.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 text-red-600">3. Sharing of Information</h2>
                    <ul className="list-disc pl-6">
                        <li><strong>With Service Providers:</strong> We may share information with third-party vendors to support our operations, such as hosting and analytics.</li>
                        <li><strong>Legal Obligations:</strong> We may disclose information to comply with legal requirements or protect our rights and users.</li>
                        <li><strong>Public Content:</strong> Any content you post (e.g., questions, answers) is visible to other users.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 text-red-600">4. Your Privacy Choices</h2>
                    <ul className="list-disc pl-6">
                        <li>You can update or delete your profile information via your account settings.</li>
                        <li>Adjust browser settings to manage cookies and similar technologies.</li>
                        <li>Contact us to request deletion or correction of your data.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 text-red-600">5. Data Security</h2>
                    <p>We use industry-standard measures to protect your data. However, no system is entirely secure, and we cannot guarantee absolute security.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 text-red-600">6. Children's Privacy</h2>
                    <p>Taggle is not intended for users under the age of 13. We do not knowingly collect personal information from children under 13.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 text-red-600">7. Changes to This Policy</h2>
                    <p>We may update this Privacy Policy from time to time. Changes will be posted here with an updated effective date. Your continued use of Taggle signifies your acceptance of the updated policy.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 text-red-600">8. Contact Us</h2>
                    <p>If you have any questions about this Privacy Policy or how we handle your data, please contact us at:</p>
                    <p><strong>Email:</strong> info@taggle.com</p>
                    <p><strong>Address:</strong> Ahmedabad, India</p>
                </section>

                <p className="mt-6">By using Taggle, you agree to this Privacy Policy and consent to the practices outlined here.</p>

                <button className="bg-red-600 shadow-lg rounded-lg py-2 px-6 text-center openSans text-xl font-semibold mt-4 text-white" onClick={handleOkClick}>
                    OK
                </button>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
