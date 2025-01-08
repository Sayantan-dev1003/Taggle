import React from 'react';

const UserAgreement = () => {
    return (
        <div className="min-h-screen bg-[#f4f4f4] flex items-center justify-center openSans">
            <div className="bg-white shadow-lg rounded-lg mx-4 p-6 w-full max-w-lg text-justify openSans">
                <h1 className="text-2xl montserrat font-bold text-center text-red-600 mb-6">User Agreement for Taggle</h1>

                <p className="mb-4">Welcome to Taggle! By accessing or using Taggle, you agree to abide by the terms and conditions outlined in this User Agreement. This Agreement is a legally binding contract between you and Taggle. Please read this document carefully.</p>

                <hr className="my-4" />

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 text-red-600">1. Acceptance of Terms</h2>
                    <p>By registering, accessing, or using the Platform, you acknowledge that you have read, understood, and agreed to this Agreement. If you do not agree to these terms, do not use the Platform.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 text-red-600">2. Eligibility</h2>
                    <p>You must be at least 13 years old to use the Platform. If you are under 18, you represent that you have the permission of a parent or guardian to use Taggle.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 text-red-600">3. User Accounts</h2>
                    <ul className="list-disc pl-6">
                        <li><strong>Registration:</strong> To access certain features, you may need to create an account. You agree to provide accurate and complete information during registration.</li>
                        <li><strong>Responsibility:</strong> You are responsible for maintaining the confidentiality of your account credentials. Notify us immediately if you suspect unauthorized use of your account.</li>
                        <li><strong>Account Termination:</strong> We reserve the right to suspend or terminate your account for violating this Agreement or engaging in prohibited activities.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 text-red-600">4. User Content</h2>
                    <ul className="list-disc pl-6">
                        <li><strong>Ownership:</strong> You retain ownership of any content (e.g., questions, answers, comments) you post on the Platform.</li>
                        <li><strong>License:</strong> By posting content, you grant Taggle a non-exclusive, royalty-free, worldwide license to use, display, reproduce, and distribute your content for operational purposes.</li>
                        <li><strong>Prohibited Content:</strong> Do not post:
                            <ul className="list-disc pl-6">
                                <li>Inappropriate, offensive, or illegal material.</li>
                                <li>Spam, advertisements, or promotions.</li>
                                <li>Plagiarized content or material violating intellectual property rights.</li>
                            </ul>
                        </li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 text-red-600">5. Prohibited Activities</h2>
                    <p>You agree not to:</p>
                    <ul className="list-disc pl-6">
                        <li>Misuse the Platform for fraudulent or illegal activities.</li>
                        <li>Use automated tools (e.g., bots, scrapers) to access the Platform.</li>
                        <li>Harass, threaten, or harm other users.</li>
                        <li>Manipulate votes, rankings, or any interactive features.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 text-red-600">6. Privacy Policy</h2>
                    <p>Your use of Taggle is subject to our Privacy Policy. Please review it to understand how we collect, use, and protect your data.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 text-red-600">7. Intellectual Property</h2>
                    <ul className="list-disc pl-6">
                        <li>All rights, titles, and interests in the Platform, including trademarks, logos, and code, are owned by Taggle.</li>
                        <li>You may not copy, modify, or distribute any part of the Platform without our explicit permission.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 text-red-600">8. Disclaimers</h2>
                    <ul className="list-disc pl-6">
                        <li>The Platform is provided &ldquo;AS IS&rdquo; without warranties of any kind.</li>
                        <li>We do not guarantee the accuracy, completeness, or usefulness of content posted by users.</li>
                        <li>We are not liable for any damages resulting from your use of the Platform.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 text-red-600">9. Limitation of Liability</h2>
                    <p>To the fullest extent permitted by law, Taggle shall not be liable for any indirect, incidental, or consequential damages arising out of your use of the Platform.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 text-red-600">10. Modification of Terms</h2>
                    <p>We reserve the right to modify this Agreement at any time. Changes will be effective upon posting. Continued use of the Platform constitutes acceptance of the updated terms.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 text-red-600">11. Termination</h2>
                    <p>We may suspend or terminate your access to the Platform for any reason, including violation of this Agreement. Upon termination, your right to use the Platform ends immediately.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 text-red-600">12. Contact Information</h2>
                    <p>If you have questions or concerns about this Agreement, please contact us at:</p>
                    <p><strong>Email:</strong> info@taggle.com</p>
                    <p><strong>Address:</strong> Ahmedabad, India</p>
                </section>

                <p className="mt-6">By using Taggle, you agree to this User Agreement and confirm that you understand its terms and conditions.</p>
            </div>
        </div>
    );
};

export default UserAgreement;