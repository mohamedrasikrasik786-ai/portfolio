import { motion } from 'motion/react';

export function CaseStudySkeletonLoader() {
  return (
    <div className="min-h-screen bg-[#0E0E0E]">
      {/* Navbar Skeleton */}
      <div className="sticky top-0 z-[999] w-full">
        <div className="bg-[#0E0E0E]/95 backdrop-blur-md border-b border-[#2a2a2a]">
          <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
            <div className="flex items-center justify-between gap-4 py-4">
              {/* Left */}
              <div className="flex items-center gap-3">
                <Skeleton className="w-24 h-10 rounded-lg" />
                <div className="h-4 w-[1px] bg-[#2a2a2a] hidden md:block" />
                <Skeleton className="w-32 h-6 rounded" />
              </div>

              {/* Right */}
              <Skeleton className="w-28 h-10 rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <section className="w-full px-8 md:px-16 lg:px-24 pt-8 pb-16">
        <div className="max-w-[900px] mx-auto">
          {/* Title */}
          <Skeleton className="w-3/4 h-20 md:h-28 mb-8 rounded" />

          {/* Metadata */}
          <Skeleton className="w-full md:w-2/3 h-6 mb-6 rounded" />

          {/* Reading time */}
          <Skeleton className="w-24 h-5 mb-8 rounded" />

          {/* Description */}
          <div className="space-y-3 mb-12">
            <Skeleton className="w-full h-6 rounded" />
            <Skeleton className="w-5/6 h-6 rounded" />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mb-12">
            <Skeleton className="w-40 h-12 rounded-lg" />
            <Skeleton className="w-40 h-12 rounded-lg" />
          </div>

          {/* Hero Image */}
          <Skeleton className="w-full aspect-[16/9] rounded-xl" />
          <Skeleton className="w-1/3 h-4 mt-3 rounded" />
        </div>
      </section>

      {/* Divider */}
      <div className="w-full px-8 md:px-16 lg:px-24">
        <div className="max-w-[900px] mx-auto h-[1px] bg-[#2a2a2a]" />
      </div>

      {/* Content Sections Skeleton */}
      <section className="w-full px-8 md:px-16 lg:px-24 py-16">
        <div className="max-w-[900px] mx-auto">
          {/* Section heading */}
          <Skeleton className="w-1/2 h-12 md:h-16 mb-8 rounded" />

          {/* Paragraphs */}
          <div className="space-y-4 mb-8">
            <Skeleton className="w-full h-5 rounded" />
            <Skeleton className="w-full h-5 rounded" />
            <Skeleton className="w-4/5 h-5 rounded" />
          </div>

          <div className="space-y-4 mb-12">
            <Skeleton className="w-full h-5 rounded" />
            <Skeleton className="w-5/6 h-5 rounded" />
          </div>

          {/* Image */}
          <Skeleton className="w-full aspect-[16/9] rounded-xl mb-3" />
          <Skeleton className="w-2/5 h-4 rounded" />
        </div>
      </section>

      {/* Another section */}
      <div className="w-full px-8 md:px-16 lg:px-24">
        <div className="max-w-[900px] mx-auto h-[1px] bg-[#2a2a2a]" />
      </div>

      <section className="w-full px-8 md:px-16 lg:px-24 py-16">
        <div className="max-w-[900px] mx-auto">
          <Skeleton className="w-2/5 h-12 md:h-16 mb-8 rounded" />
          
          <div className="space-y-4">
            <Skeleton className="w-full h-5 rounded" />
            <Skeleton className="w-full h-5 rounded" />
            <Skeleton className="w-3/4 h-5 rounded" />
          </div>
        </div>
      </section>
    </div>
  );
}

// Skeleton component with shimmer animation
function Skeleton({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`bg-[#1c1c1c] relative overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2a2a2a] to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </motion.div>
  );
}
