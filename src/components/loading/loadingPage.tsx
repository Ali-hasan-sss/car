import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex space-x-2">
        {["#008080", "#008080", "#008080", "#008080"].map((color, index) => (
          <motion.div
            key={index}
            initial={{ y: 0 }}
            animate={{ y: [-10, 10, -10] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatType: "reverse",
              delay: index * 0.2,
            }}
            className="w-6 h-6 rounded-md"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;
