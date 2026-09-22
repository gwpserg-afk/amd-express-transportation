import Layout from "@/components/layout/Layout";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-2xl md:text-4xl font-bold text-foreground mb-6">
            Privacy Policy
          </h1>

          <div className="prose prose-sm max-w-none text-foreground/80 space-y-4">
            <p>
              AMD Express Transportation LLC is committed to protecting your privacy and safeguarding the personal information you provide when using our non-emergency medical transportation services. This policy explains how we collect, use, and protect your information.
            </p>

            <h2 className="font-heading text-lg md:text-xl font-semibold text-foreground mt-6 mb-3">
              Non-Discrimination Policy
            </h2>
            <p>
              AMD Express Transportation does not discriminate against any individual based on race, color, national origin, gender, age, disability, religion, or sexual orientation.
            </p>
            <p>
              Everyone is entitled to equal access to our services and fair, dignified treatment during transport.
            </p>

            <h2 className="font-heading text-lg md:text-xl font-semibold text-foreground mt-6 mb-3">
              Information We Collect
            </h2>
            <p>
              <strong>Personal Information:</strong> Full name, contact number, transport needs, and appointment details
            </p>
            <p>
              <strong>Location Data:</strong> GPS tracking may be used during active transportation
            </p>
            <p>
              <strong>Payment Information:</strong> Collected only when required for billing purposes
            </p>

            <h2 className="font-heading text-lg md:text-xl font-semibold text-foreground mt-6 mb-3">
              How We Use Your Information
            </h2>
            <p>To schedule and provide safe, timely transportation services</p>
            <p>To confirm appointments, provide ride updates, or respond to inquiries</p>
            <p>To fulfill service documentation and recordkeeping responsibilities</p>

            <h2 className="font-heading text-lg md:text-xl font-semibold text-foreground mt-6 mb-3">
              Information Sharing
            </h2>
            <p>
              <strong>With Staff:</strong> Only shared with employees involved in delivering your transportation
            </p>
            <p>
              <strong>When Required:</strong> Shared only when legally necessary
            </p>
            <p>
              <strong>With Consent:</strong> Never shared or sold without your permission
            </p>

            <h2 className="font-heading text-lg md:text-xl font-semibold text-foreground mt-6 mb-3">
              Data Security
            </h2>
            <p>
              We use secure digital systems and limit access to authorized personnel only.
            </p>

            <h2 className="font-heading text-lg md:text-xl font-semibold text-foreground mt-6 mb-3">
              Your Rights
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Access your personal information at any time</li>
              <li>Request corrections or updates</li>
              <li>Ask for deletion of your information</li>
              <li>Opt out of non-essential messages</li>
            </ul>

            <h2 className="font-heading text-lg md:text-xl font-semibold text-foreground mt-6 mb-3">
              Contact for Privacy Requests
            </h2>
            <p>📧 info@amdexpresstransportation.com</p>
            <p>📞 (469) 934-2087</p>
            <p>
              Thank you for trusting AMD Express Transportation.
            </p>

            <p className="text-xs text-muted-foreground mt-8 pt-4 border-t border-border">
              Last updated: January 2025
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
