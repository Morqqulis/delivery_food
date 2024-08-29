import DefaultLayout from '#layouts/DefaultLayout'
import { NextPage } from 'next'
import Link from 'next/link'

const Terms: NextPage = (): JSX.Element => {
   return (
      <DefaultLayout full>
         <main>
            <section className={`py-20`}>
               <div className="container">
                  <h1 className="mb-10 text-center text-5xl font-bold">Terms of Service</h1>
                  <p className="mb-4">
                     Welcome to food-explorer! By accessing or using our services, you agree to comply with and be bound
                     by these Terms of Service. Please read these terms carefully before using our website or services.
                  </p>

                  <h2 className="mb-4 text-2xl font-semibold">1. Acceptance of Terms</h2>
                  <p className="mb-4">
                     By using food-explorer, you agree to these terms and conditions. If you do not agree with any part
                     of these terms, you must not use our services.
                  </p>

                  <h2 className="mb-4 text-2xl font-semibold">2. Changes to Terms</h2>
                  <p className="mb-4">
                     We reserve the right to update or change these terms at any time without prior notice. Your
                     continued use of the service after any changes constitutes acceptance of the new terms.
                  </p>

                  <h2 className="mb-4 text-2xl font-semibold">3. User Accounts</h2>
                  <p className="mb-4">
                     To access certain features of food-explorer, you may be required to create an account. You agree to
                     provide accurate and complete information and to keep this information updated. You are responsible
                     for maintaining the confidentiality of your account and password.
                  </p>

                  <h2 className="mb-4 text-2xl font-semibold">4. Use of the Service</h2>
                  <p className="mb-4">
                     You agree to use food-explorer only for lawful purposes and in a way that does not infringe the
                     rights of, restrict, or inhibit anyone else's use of the service. Prohibited behavior includes
                     harassing or causing distress to any other user.
                  </p>

                  <h2 className="mb-4 text-2xl font-semibold">5. Intellectual Property</h2>
                  <p className="mb-4">
                     All content, logos, trademarks, and other intellectual property displayed on food-explorer are
                     owned by or licensed to us. You may not use, copy, reproduce, or distribute any content without our
                     permission.
                  </p>

                  <h2 className="mb-4 text-2xl font-semibold">6. Limitation of Liability</h2>
                  <p className="mb-4">
                     We shall not be liable for any direct, indirect, incidental, special, consequential, or exemplary
                     damages resulting from your use of food-explorer.
                  </p>

                  <h2 className="mb-4 text-2xl font-semibold">7. Termination</h2>
                  <p className="mb-4">
                     We may terminate or suspend your access to food-explorer immediately, without prior notice or
                     liability, if you breach these terms.
                  </p>

                  <h2 className="mb-4 text-2xl font-semibold">8. Governing Law</h2>
                  <p className="mb-4">
                     These terms shall be governed and construed in accordance with the laws of the jurisdiction where
                     food-explorer is operated, without regard to its conflict of law provisions.
                  </p>

                  <h2 className="mb-4 text-2xl font-semibold">9. Contact Us</h2>
                  <p className="mb-4">
                     If you have any questions about these Terms of Service, please contact us at{' '}
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

export default Terms
