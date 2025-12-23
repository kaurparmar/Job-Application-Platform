import React from 'react';
import PropTypes from 'prop-types'; // Optional, but good practice for type checking

export const badgeVariants = {
  default: ' bg-primary text-primary-foreground hover:bg-primary/80',
  destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
  outline: 'text-foreground',
  secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
  success: 'border-transparent bg-green-500 text-white hover:bg-green-500/80', // Custom variant
  warning: 'border-transparent bg-yellow-500 text-black hover:bg-yellow-500/80', // Custom variant
};

const Badge = ({ children, variant='default', className='' }) => {
  const baseStyles = ' ';
  const variantStyles = badgeVariants[variant] || badgeVariants.default;
  
  // Combine base styles, variant specific styles, and any extra class names passed in
  const combinedClassName = `${baseStyles} ${variantStyles} ${className || ''}`;

  return (
    <div className={combinedClassName}>
      {children}
    </div>
  );
};

// Optional PropTypes for type checking
Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(Object.keys(badgeVariants)),
  className: PropTypes.string,
};

Badge.defaultProps = {
  variant: 'default',
  className: '',
};

export  default Badge;

