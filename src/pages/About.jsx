import { motion } from 'framer-motion';

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen pt-24 pb-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-orange-primary font-heading tracking-widest text-sm uppercase mb-3">
            Who We Are
          </p>
          <h1 className="font-display text-6xl sm:text-8xl tracking-widest text-white">
            OUR <span className="text-orange-primary">STORY</span>
          </h1>
        </motion.div>

        {/* Story + Images */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-orange-primary font-heading tracking-widest text-sm uppercase mb-4">
              Est. Hyderabad
            </p>
            <h2 className="font-display text-4xl text-white mb-6 tracking-wider">
              WHERE THE TRAIL BEGAN
            </h2>
            <p className="text-white/50 font-body leading-relaxed mb-4">
              Burger Trails was born from a simple but powerful idea — that street-level passion
              and premium quality don't have to be mutually exclusive. Founded in the lively
              neighbourhood of Upperpally, Hyderabad, we started as a small corner kitchen with
              big dreams and even bigger flavours.
            </p>
            <p className="text-white/40 font-body leading-relaxed mb-4">
              Our founder, a self-taught chef with a deep love for bold flavours and late-night
              cravings, began crafting recipes that blended the classic comfort of a great burger
              with the bold spices of Hyderabad's rich culinary tradition.
            </p>
            <p className="text-white/40 font-body leading-relaxed">
              Today, Burger Trails is more than a restaurant — it's a destination. Open every
              evening from 3 PM to 3 AM, we serve the night owls, the foodies, the students,
              and everyone in between who believes that great food deserves no curfew.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 gap-3"
          >
            {[
              { src: '/images/ambience/interior1.jpg', span: 'col-span-2', aspect: 'aspect-video' },
              { src: '/images/ambience/exterior.jpg', span: 'col-span-1', aspect: 'aspect-square' },
              { src: '/images/ambience/interior2.jpg', span: 'col-span-1', aspect: 'aspect-square' },
            ].map(({ src, span, aspect }, i) => (
              <div key={i} className={`${span} ${aspect} rounded-2xl overflow-hidden`}>
                <img
                  src={src}
                  alt={`Burger Trails Ambience ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.parentElement.style.background = '#1A1A1A';
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Values */}
        <div className="grid sm:grid-cols-3 gap-6 mb-20">
          {[
            {
              icon: '🔥',
              title: 'Bold Flavours',
              desc: 'Every recipe is crafted to deliver an unforgettable punch of flavour. No bland bites, no shortcuts — just fire on every plate.',
            },
            {
              icon: '🌿',
              title: 'Fresh Ingredients',
              desc: 'We source only the freshest produce and meats, prepped daily from scratch. Quality you can taste in every single bite.',
            },
            {
              icon: '🌙',
              title: 'Open Late',
              desc: "Because the best cravings hit after midnight. We're here from 3 PM to 3 AM, every single day — rain or shine.",
            },
          ].map(({ icon, title, desc }) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass rounded-2xl p-8 text-center hover:border-orange-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-orange-primary/10"
            >
              <span className="text-5xl mb-4 block">{icon}</span>
              <h3 className="font-heading font-semibold text-white text-lg mb-3">{title}</h3>
              <p className="text-white/40 font-body text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Ambience Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-5xl tracking-widest text-white mb-3">
            OUR <span className="text-orange-primary">AMBIENCE</span>
          </h2>
          <p className="text-white/40 font-body text-sm">Step inside the trail</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            '/images/ambience/interior1.jpg',
            '/images/ambience/interior2.jpg',
            '/images/ambience/exterior.jpg',
            '/images/menu/burgers/classic-chicken.jpg',
            '/images/menu/pizza/trails-special.jpg',
            '/images/menu/desserts/lava-cake.jpg',
          ].map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="aspect-square rounded-2xl overflow-hidden group cursor-pointer"
            >
              <img
                src={src}
                alt={`Ambience ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.target.parentElement.style.background = '#1A1A1A';
                  e.target.style.display = 'none';
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
