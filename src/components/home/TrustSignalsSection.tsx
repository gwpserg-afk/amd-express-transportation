import { Clock, Accessibility, Heart, Shield, Users } from "lucide-react";
import { motion } from "framer-motion";

const trustSignals = [
  { icon: Clock, label: "On-time Pickups" },
  { icon: Accessibility, label: "Wheelchair Accessible" },
  { icon: Heart, label: "Friendly Drivers" },
  { icon: Shield, label: "Insurance/Work Comp" },
  { icon: Users, label: "Professional Team" },
];

const TrustSignalsSection = () => {
  return (
    <section className="py-4 md:py-6 bg-secondary/50 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {trustSignals.map((signal, index) => (
            <motion.div
              key={signal.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              className="flex items-center gap-2"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                <signal.icon className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">{signal.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSignalsSection;
