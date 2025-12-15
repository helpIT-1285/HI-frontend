function Stars({priority}) {
    const StarIcon = ({ size = 24 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path d="M12 2l2.9 6.1 6.7.9-4.8 4.6 1.2 6.6L12 17.8 6 20.2l1.2-6.6-4.8-4.6 6.7-.9z" />
    </svg>
    );

    const StarOutlineIcon = ({ size = 24, strokeWidth = 2 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polygon points="12 2 15 8.5 22 9.3 17 14 18.5 21 12 17.5 5.5 21 7 14 2 9.3 9 8.5" />
    </svg>
    );

    const maxStars = 5;

    return (
        <div className="stars">
            {Array.from({ length: maxStars }, (_, i) =>
                i < priority ? <StarIcon key={i} /> : <StarOutlineIcon key={i} />
            )}
        </div>
    );
}

export default Stars;