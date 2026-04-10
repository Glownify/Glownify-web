import React, { useState } from 'react';

/**
 * A reusable Avatar component that handles initials, colors, and image fallbacks.
 */
const Avatar = ({ src, initials, color = "#fecdd3", size = 48, textColor = "#9f1239" }) => {
    const [imgError, setImgError] = useState(false);

    if (src && !imgError) {
        return (
            <img
                src={src}
                alt={initials || "Avatar"}
                onError={() => setImgError(true)}
                className="rounded-full shrink-0 object-cover shadow-sm"
                style={{ width: size, height: size }}
            />
        );
    }

    return (
        <div 
            className="rounded-full flex items-center justify-center shrink-0 font-bold shadow-sm"
            style={{ 
                width: size, 
                height: size, 
                backgroundColor: color, 
                fontSize: size * 0.33, 
                color: textColor 
            }}
        >
            {initials || "?"}
        </div>
    );
};

export default Avatar;
