import DefaultLayout from '#layouts/DefaultLayout'
import { NextPage } from 'next'
import Link from 'next/link'

const Privacy: NextPage = () => {
   return (
      <DefaultLayout full>
         <main>
            <section className={`py-20`}>
               <div className="container">
                  <h1 className="mb-10 text-center text-5xl font-bold">Privacy Policy</h1>
                  <p className="mb-4">
                     Welcome to food-explorer! We are committed to protecting your privacy. This Privacy Policy explains
                     how we collect, use, disclose, and safeguard your information when you visit our website and use
                     our services. By accessing or using the food-explorer application, you consent to the practices
                     described in this policy.
                  </p>

                  <h2 className="mb-4 text-2xl font-semibold">Information We Collect</h2>
                  <p className="mb-4">
                     We may collect personal information from you, such as your name, email address, and payment
                     information when you create an account, make a purchase, or contact us for support. We also collect
                     non-personal information, such as your browser type, operating system, and IP address, to improve
                     our service.
                  </p>

                  <h2 className="mb-4 text-2xl font-semibold">How We Use Your Information</h2>
                  <p className="mb-4">We use the information we collect to:</p>
                  <ul className="mb-4 list-inside list-disc">
                     <li>Provide and maintain our services</li>
                     <li>Process transactions and send you related information</li>
                     <li>Respond to your comments, questions, and support requests</li>
                     <li>Communicate with you about updates, promotions, and other relevant information</li>
                     <li>Monitor and analyze usage and trends to improve our services</li>
                  </ul>

                  <h2 className="mb-4 text-2xl font-semibold">Information Sharing and Disclosure</h2>
                  <p className="mb-4">
                     We do not sell or rent your personal information to third parties. We may share information with
                     vendors and service providers who assist us in operating our business and providing our services.
                     These third parties are required to protect your information and only use it for the specific
                     purpose for which it was shared.
                  </p>

                  <h2 className="mb-4 text-2xl font-semibold">Security</h2>
                  <p className="mb-4">
                     We take reasonable measures to protect your information from unauthorized access, use, or
                     disclosure. However, please be aware that no method of transmission over the internet or method of
                     electronic storage is 100% secure, and we cannot guarantee absolute security.
                  </p>

                  <h2 className="mb-4 text-2xl font-semibold">Changes to This Privacy Policy</h2>
                  <p className="mb-4">
                     We may update this Privacy Policy from time to time. Any changes will be posted on this page with
                     an updated effective date. We encourage you to review this Privacy Policy periodically to stay
                     informed about how we are protecting your information.
                  </p>

                  <h2 className="mb-4 text-2xl font-semibold">Contact Us</h2>
                  <p className="mb-4">
                     If you have any questions or concerns about this Privacy Policy, please contact us at{' '}
                     <Link href="mailto:bayram.behbudov@gmail.com" className="text-blue-500">
                        bayram.behbudov@gmail.com
                     </Link>
                     .
                  </p>
               </div>
            </section>
         </main>
      </DefaultLayout>
   )
}

export default Privacy
