import React from 'react';

interface OtterAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  emotion?: 'normal' | 'happy' | 'holding';
  className?: string;
}

// Since we don't have the exact local assets, we simulate the specific "cute otter" look 
// using a high-quality placeholder and styling.
const OtterAvatar: React.FC<OtterAvatarProps> = ({ size = 'md', emotion = 'normal', className = '' }) => {
  let sizeClasses = 'w-32 h-32';
  if (size === 'sm') sizeClasses = 'w-16 h-16';
  if (size === 'lg') sizeClasses = 'w-48 h-48';
  if (size === 'xl') sizeClasses = 'w-64 h-64';

  // Using a cute otter-like placeholder. 
  // In a real production app, this would be: src="/assets/otter_normal.png"
  const imageUrl = "https://images.unsplash.com/photo-1599507626966-261f211516e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80";

  return (
    <div className={`relative ${sizeClasses} ${className} flex-shrink-0`}>
      <div className="absolute inset-0 bg-[#D4C5B0] rounded-full opacity-20 blur-xl scale-90"></div>
      <img 
        src={imageUrl} 
        alt="念念 NianNian" 
        className={`w-full h-full object-cover rounded-full border-4 border-white shadow-lg transition-transform duration-500 ${emotion === 'happy' ? 'scale-110' : ''}`}
      />
      {emotion === 'happy' && (
        <div className="absolute -top-2 -right-2 text-4xl animate-bounce">
          ✨
        </div>
      )}
    </div>
  );
};

export default OtterAvatar;