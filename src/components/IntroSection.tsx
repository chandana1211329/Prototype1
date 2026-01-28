import { Compass, Palette, Music, Utensils, Building, Users } from 'lucide-react';

const features = [
  {
    icon: Compass,
    title: 'Diverse Landscapes',
    description: 'From the majestic Himalayas to serene backwaters, golden deserts to lush rainforests.',
  },
  {
    icon: Palette,
    title: 'Rich Culture',
    description: 'A tapestry of traditions, art forms, and customs passed down through millennia.',
  },
  {
    icon: Music,
    title: 'Traditional Dances',
    description: 'Classical and folk dances telling stories of gods, nature, and everyday life.',
  },
  {
    icon: Utensils,
    title: 'Culinary Heritage',
    description: 'A gastronomic journey through spices, flavors, and regional delicacies.',
  },
  {
    icon: Building,
    title: 'Ancient Architecture',
    description: 'Temples, forts, and palaces showcasing centuries of architectural brilliance.',
  },
  {
    icon: Users,
    title: 'Warm Hospitality',
    description: '"Atithi Devo Bhava" – where guests are treated as gods with utmost respect.',
  },
];

const IntroSection = () => {
  return (
    <section className="section-padding relative z-20">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
            Why India?
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            A Land of{' '}
            <span className="text-gradient-gold">Endless Wonders</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            India is not just a country; it's a subcontinent of experiences. 
            With 29 states, each with its unique identity, every journey here 
            unveils new stories, flavors, and memories that last a lifetime.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass-card p-6 md:p-8 rounded-2xl hover-glow group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/30 transition-colors duration-300">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="mt-16 md:mt-24 text-center">
          <blockquote className="glass-card p-8 md:p-12 rounded-2xl max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl font-heading text-foreground italic mb-6">
              "India is the cradle of the human race, the birthplace of human speech, 
              the mother of history, and the grandmother of legend."
            </p>
            <cite className="text-primary font-medium not-italic">
              — Mark Twain
            </cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
