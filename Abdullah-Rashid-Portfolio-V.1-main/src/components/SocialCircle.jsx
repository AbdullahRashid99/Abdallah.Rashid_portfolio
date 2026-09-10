import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaGoogle, FaSnapchatGhost, FaLinkedinIn, FaYoutube, FaPinterestP, FaTiktok, FaTwitter } from 'react-icons/fa';

const platforms = [
  { name: 'Facebook', Icon: FaFacebookF, color: '#1877F2' },
  { name: 'Instagram', Icon: FaInstagram, color: '#E1306C' },
  { name: 'Google', Icon: FaGoogle, color: '#4285F4' },
  { name: 'Snapchat', Icon: FaSnapchatGhost, color: '#FFFC00' },
  { name: 'LinkedIn', Icon: FaLinkedinIn, color: '#0077B5' },
  { name: 'YouTube', Icon: FaYoutube, color: '#FF0000' },
  { name: 'X', Icon: FaTwitter, color: '#1DA1F2' },
  { name: 'TikTok', Icon: FaTiktok, color: '#000000' },
  { name: 'Pinterest', Icon: FaPinterestP, color: '#E60023' }
];

export default function SocialCircle() {
  const radius = 120;
  const size = 280;

  return (
    <section className="py-8 flex justify-center items-center">
      <div className="relative mx-auto" style={{ width: size, height: size }}>
        {/* Rotating container for icons */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          whileHover={{
            animationPlayState: "paused"
          }}
        >
          {platforms.map((platform, index) => {
            const angle = (index / platforms.length) * 2 * Math.PI;
            const x = Math.cos(angle) * radius + size / 2 - 20;
            const y = Math.sin(angle) * radius + size / 2 - 20;

            return (
              <motion.div
                key={platform.name}
                className="absolute cursor-pointer group"
                style={{ left: x, top: y }}
                animate={{ rotate: -360 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                whileHover={{ 
                  scale: 1.2,
                  animationPlayState: "paused"
                }}
              >
                <div
                  className="w-10 h-10 rounded-full shadow-lg flex items-center justify-center border border-neutral-700/50"
                  style={{
                    backgroundColor: platform.color,
                    boxShadow: `0 4px 15px ${platform.color}40`,
                  }}
                >
                  <platform.Icon 
                    size={20} 
                    color={platform.name === 'Snapchat' ? '#000000' : '#FFFFFF'}
                  />
                </div>
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {platform.name}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Center "Ads" text with glow effect */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20">
          <motion.div
            className="text-3xl font-bold text-white tracking-wide px-4 py-2 rounded-full bg-neutral-900/90 border border-neutral-700 shadow-xl"
            animate={{
              textShadow: [
                "0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)",
                "0 0 15px rgba(255, 255, 255, 1), 0 0 25px rgba(255, 255, 255, 0.8)",
                "0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Ads
          </motion.div>
        </div>
      </div>
    </section>
  );
}
