// avatar for login logo
import React from 'react';

export default function Avatar({ src, alt, size = 40 }) {  
    return (
        <img 
            src={src}
            className={`rounded-full`}
            style={{ width: size, height: size }}
        />
    );
}