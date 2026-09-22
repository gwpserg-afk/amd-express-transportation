import Layout from "@/components/layout/Layout";

const SafetyPolicy = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-2xl md:text-4xl font-bold text-foreground mb-6">
            Safety & Zero-Tolerance Policy
          </h1>

          <div className="prose prose-sm max-w-none text-foreground/80 space-y-4">
            <p>
              At AMD Express Transportation, we maintain the highest standards of safety, professionalism, and care for every passenger.
            </p>

            <h2 className="font-heading text-lg md:text-xl font-semibold text-foreground mt-6 mb-3">
              Zero-Tolerance Drug & Alcohol Policy
            </h2>

            <h3 className="font-heading text-base font-semibold text-foreground mt-4 mb-2">
              Introduction
            </h3>
            <p>
              AMD Express Transportation LLC strictly enforces a Zero-Tolerance Policy regarding the use of alcohol, controlled substances, or impairing medications by drivers.
            </p>

            <h3 className="font-heading text-base font-semibold text-foreground mt-4 mb-2">
              Prohibited Conduct
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Operating a vehicle under the influence</li>
              <li>Possessing or consuming alcohol/drugs on duty</li>
              <li>Reporting to duty impaired</li>
              <li>Refusing drug or alcohol screening</li>
            </ul>

            <h3 className="font-heading text-base font-semibold text-foreground mt-4 mb-2">
              Reporting & Complaint Procedure
            </h3>
            <p>
              Report incidents immediately with strict confidentiality maintained:
            </p>
            <p>Phone: (469) 934-2087</p>
            <p>Email: info@amdexpresstransportation.com</p>

            <h2 className="font-heading text-lg md:text-xl font-semibold text-foreground mt-6 mb-3">
              Driver Conduct & Professionalism
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Maintain professional appearance and attitude</li>
              <li>Trained in assisting elderly and wheelchair-bound passengers</li>
              <li>Operate vehicles responsibly</li>
              <li>Undergo background checks before providing service</li>
            </ul>

            <h2 className="font-heading text-lg md:text-xl font-semibold text-foreground mt-6 mb-3">
              Passenger Safety Practices
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>All passengers must wear seatbelts</li>
              <li>Vehicles regularly maintained and inspected</li>
              <li>Wheelchair-accessible vans with secure restraints</li>
              <li>Mobility equipment properly secured before transport</li>
            </ul>

            <h2 className="font-heading text-lg md:text-xl font-semibold text-foreground mt-6 mb-3">
              Complaint Policy
            </h2>
            <p>
              We encourage all passengers to report any incidents or concerns:
            </p>
            <p>📞 (469) 934-2087</p>
            <p>📧 info@amdexpresstransportation.com</p>

            <p className="text-xs text-muted-foreground mt-8 pt-4 border-t border-border">
              Last updated: January 2025
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SafetyPolicy;
