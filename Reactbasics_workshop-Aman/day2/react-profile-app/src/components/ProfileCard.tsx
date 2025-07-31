import { useState } from 'react';
import type { ProfileCardProps } from '../types';
import styles from '../styles/ProfileCard.module.css';
import { FaTwitter, FaLinkedin } from 'react-icons/fa';

const ProfileCard = ({
  name,
  age,
  email,
  avatarUrl,
  badges,
  socials,
  children,
}: ProfileCardProps) => {
  const [showBio, setShowBio] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.gradientHeader}></div>
      <img
        src={avatarUrl}
        alt={`${name} avatar`}
        className={styles.avatar}
      />
      <div className={styles.header}>
        <h2 className={styles.name}>{name}</h2>
        <div className={styles.age}>Age: {age}</div>
      </div>
      <div className={styles.email}>{email}</div>
      
      {badges && (
        <div className={styles.badgesRow}>
          {badges.map((badge, idx) => (
            <span className={styles.badge} key={idx}>{badge}</span>
          ))}
        </div>
      )}

      <button
        onClick={() => setShowBio(prev => !prev)}
        className={styles.button}
        aria-expanded={showBio}
      >
        {showBio ? 'Hide Bio' : 'Show Bio'}
      </button>
      {showBio && (
        <div className={styles.bio}>
          {children || <p>No bio available.</p>}
        </div>
      )}

      {socials && (
        <div className={styles.socials}>
          {socials.twitter && (
            <a href={socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
          )}
          {socials.linkedin && (
            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
