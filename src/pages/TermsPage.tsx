import { useTheme } from '../context/ThemeContext';

export default function TermsPage() {
  const { theme } = useTheme();

  const getThemeColors = () => {
    switch (theme) {
      case 'industrial':
        return {
          accent: 'text-red-500',
          border: 'border-red-500/30',
          bg: 'bg-red-950/20',
          gradient: 'from-red-950/40 to-transparent'
        };
      case 'psytrance':
        return {
          accent: 'text-purple-400',
          border: 'border-purple-500/30',
          bg: 'bg-purple-950/20',
          gradient: 'from-purple-950/40 to-transparent'
        };
      case 'detroit':
        return {
          accent: 'text-blue-400',
          border: 'border-blue-500/30',
          bg: 'bg-blue-950/20',
          gradient: 'from-blue-950/40 to-transparent'
        };
    }
  };

  const colors = getThemeColors();

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className={`text-5xl md:text-6xl font-black text-white mb-5 ${colors.accent}`}>Terms & Conditions</h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            Long-form legal information. Please read carefully.
          </p>
        </div>

        <div className={`${colors.bg} backdrop-blur-sm border ${colors.border} rounded-lg overflow-hidden`}>
          <div className={`bg-gradient-to-r ${colors.gradient} p-8 md:p-12`}>
            <div className="max-w-3xl mx-auto">
              <div className="text-sm text-gray-300 leading-relaxed space-y-6">
                <p>
                  These Terms & Conditions (the “Terms”) govern your access to and use of the SKUT website and any related
                  services, content, features, and products (collectively, the “Services”). By accessing or using the
                  Services, you agree to be bound by these Terms. If you do not agree, do not use the Services.
                </p>

                <div>
                  <h2 className={`text-xl font-bold ${colors.accent} mb-2`}>1. Eligibility</h2>
                  <p>
                    You must be at least the age of majority in your jurisdiction to use the Services. By using the
                    Services, you represent that you meet this requirement and that you have the legal capacity to enter
                    into these Terms.
                  </p>
                </div>

                <div>
                  <h2 className={`text-xl font-bold ${colors.accent} mb-2`}>2. Accounts and Accuracy</h2>
                  <p>
                    If you create an account or submit information through the Services, you agree to provide accurate,
                    current, and complete information and to keep it updated. You are responsible for maintaining the
                    confidentiality of any account credentials and for all activities that occur under your account.
                  </p>
                </div>

                <div>
                  <h2 className={`text-xl font-bold ${colors.accent} mb-2`}>3. Orders, Pricing, and Availability</h2>
                  <p>
                    Product listings are provided for informational purposes and may change without notice. Prices,
                    availability, and descriptions may be modified at any time. We reserve the right to cancel or refuse
                    any order for any reason, including suspected fraud, pricing errors, inventory limitations, or
                    violations of these Terms.
                  </p>
                  <p>
                    Taxes, duties, shipping fees, and other charges may apply based on your location and selected
                    shipping method. You are responsible for reviewing the total price before placing an order.
                  </p>
                </div>

                <div>
                  <h2 className={`text-xl font-bold ${colors.accent} mb-2`}>4. Shipping and Delivery</h2>
                  <p>
                    Delivery times are estimates and are not guaranteed. Risk of loss and title for purchased items pass
                    to you upon delivery to the carrier, unless otherwise required by applicable law. If a shipment is
                    delayed, lost, or damaged, we will make reasonable efforts to assist in the carrier claim process,
                    but we do not guarantee outcomes.
                  </p>
                </div>

                <div>
                  <h2 className={`text-xl font-bold ${colors.accent} mb-2`}>5. Returns and Refunds</h2>
                  <p>
                    Return and refund eligibility depends on product condition, timing, and applicable policies at the
                    time of purchase. Items returned must generally be unused, unwashed, and in the original packaging
                    where applicable. Certain items may be non-returnable for hygiene or safety reasons.
                  </p>
                </div>

                <div>
                  <h2 className={`text-xl font-bold ${colors.accent} mb-2`}>6. Acceptable Use</h2>
                  <p>
                    You agree not to misuse the Services. Misuse includes attempting to gain unauthorized access,
                    interfering with normal operation, scraping or harvesting data at scale, transmitting malicious
                    code, or using the Services in a way that violates any applicable law or regulation.
                  </p>
                </div>

                <div>
                  <h2 className={`text-xl font-bold ${colors.accent} mb-2`}>7. Intellectual Property</h2>
                  <p>
                    All content on the Services, including designs, logos, graphics, text, and visual styling, is owned
                    by SKUT or its licensors and is protected by intellectual property laws. You may not reproduce,
                    distribute, modify, create derivative works, publicly display, or exploit any content without prior
                    written permission.
                  </p>
                </div>

                <div>
                  <h2 className={`text-xl font-bold ${colors.accent} mb-2`}>8. Third-Party Links and Services</h2>
                  <p>
                    The Services may include links to third-party websites or integrations. We do not control or endorse
                    third-party content and are not responsible for their practices. Your use of third-party services is
                    at your own risk and subject to their terms.
                  </p>
                </div>

                <div>
                  <h2 className={`text-xl font-bold ${colors.accent} mb-2`}>9. Disclaimers</h2>
                  <p>
                    The Services are provided on an “as is” and “as available” basis without warranties of any kind,
                    whether express, implied, or statutory. To the fullest extent permitted by law, we disclaim all
                    warranties, including implied warranties of merchantability, fitness for a particular purpose, and
                    non-infringement.
                  </p>
                </div>

                <div>
                  <h2 className={`text-xl font-bold ${colors.accent} mb-2`}>10. Limitation of Liability</h2>
                  <p>
                    To the fullest extent permitted by law, SKUT and its affiliates, officers, employees, and agents
                    will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any
                    loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use,
                    goodwill, or other intangible losses, resulting from your access to or use of the Services.
                  </p>
                </div>

                <div>
                  <h2 className={`text-xl font-bold ${colors.accent} mb-2`}>11. Changes to These Terms</h2>
                  <p>
                    We may update these Terms from time to time. The updated Terms will be effective when posted. Your
                    continued use of the Services after any update constitutes acceptance of the revised Terms.
                  </p>
                </div>

                <div>
                  <h2 className={`text-xl font-bold ${colors.accent} mb-2`}>12. Contact</h2>
                  <p>
                    If you have questions about these Terms, please contact us through the channels provided on the
                    website. Please include relevant order details when applicable.
                  </p>
                </div>

                <p className="text-gray-400">
                  This document is intentionally long and formal in tone. It is provided for general informational
                  purposes and may be supplemented by additional policies and notices displayed throughout the Services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

