import React from 'react';
import { useNavigate } from 'react-router-dom';

const CookiesPolicy = () => {
    const navigate = useNavigate();

    const handleOkClick = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-[#f4f4f4] flex items-center justify-center openSans py-4">
            <div className="bg-white shadow-lg rounded-lg mx-4 p-6 w-full max-w-lg text-justify openSans">
                <h1 className="text-2xl montserrat font-bold text-center text-red-600 mb-6">Cookies Policy for Taggle</h1>

                <p className="mb-4">Welcome to Taggle's Cookies Policy. This page explains how and why cookies are used on our platform to improve your experience.</p>

                <hr className="my-4" />

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 text-red-600">1. What are Cookies?</h2>
                    <p>Cookies are small text files stored on your device when you visit a website. They help us recognize your device and store information about your preferences and past actions.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 text-red-600">2. How We Use Cookies</h2>
                    <ul className="list-disc pl-6">
                        <li>To enhance your browsing experience by remembering your preferences.</li>
                        <li>To provide personalized content and features.</li>
                        <li>To analyze how users interact with our platform, enabling us to improve functionality.</li>
                        <li>To ensure the security and functionality of our platform.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 text-red-600">3. Types of Cookies We Use</h2>
                    <ul className="list-disc pl-6">
                        <li><strong>Essential Cookies:</strong> Required for the basic functioning of the platform.</li>
                        <li><strong>Performance Cookies:</strong> Help us analyze how users interact with the platform.</li>
                        <li><strong>Functional Cookies:</strong> Store preferences to provide personalized features.</li>
                        <li><strong>Advertising Cookies:</strong> Used to deliver relevant ads and track campaign effectiveness.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 text-red-600">4. Managing Cookies</h2>
                    <p>You can manage or disable cookies through your browser settings. However, disabling cookies may impact the functionality and features of the platform.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 text-red-600">5. Third-Party Cookies</h2>
                    <p>We may use third-party services that place cookies on your device, such as analytics providers and advertising partners. These cookies are governed by the third-party's privacy policies.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 text-red-600">6. Updates to this Policy</h2>
                    <p>We may update this Cookies Policy from time to time. Changes will be effective immediately upon posting the updated policy on our platform.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 text-red-600">7. Contact Us</h2>
                    <p>If you have any questions about our Cookies Policy, you can contact us at:</p>
                    <p><strong>Email:</strong> info@taggle.com</p>
                    <p><strong>Address:</strong> Ahmedabad, India</p>
                </section>

                <p className="mt-6">By continuing to use Taggle, you consent to the use of cookies as outlined in this policy.</p>

                <button className="bg-red-600 shadow-lg rounded-lg py-2 px-6 text-center openSans text-xl font-semibold mt-4 text-white" onClick={handleOkClick}>
                    OK
                </button>
            </div>
        </div>
    );
};

export default CookiesPolicy;
