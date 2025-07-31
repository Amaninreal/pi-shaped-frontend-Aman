import ProfileCard from './components/ProfileCard';
import './App.css';

// Sample avatars—you can use placeholder images if needed (e.g., via https://i.pravatar.cc/)
const users = [
  {
    name: "Alice Johnson",
    age: 28,
    email: "alice@workplace.com",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    badges: ["Frontend", "React", "TypeScript"],
    socials: { twitter: "https://twitter.com/alicejohnson", linkedin: "https://linkedin.com/in/alicejohnson" },
    bio: "Alice is a frontend developer with 2 years of experience in React and TypeScript. She loves hiking and photography in her free time."
  },
  {
    name: "Bob Smith",
    age: 35,
    email: "bob.smith@workplace.com",
    avatarUrl: "https://i.pravatar.cc/150?img=4",
    badges: ["Backend", "Node.js", "Microservices"],
    socials: { twitter: "https://twitter.com/bsmith", linkedin: "https://linkedin.com/in/bsmith" },
    bio: "Bob is a backend engineer specializing in Node.js and microservices architecture. He's also an amateur chef who enjoys cooking Italian cuisine."
  },
  {
    name: "Charlie Brown",
    age: 42,
    email: "charlie.b@company.org",
    avatarUrl: "https://i.pravatar.cc/150?img=7",
    badges: ["Full Stack", "Mentor", "Team Lead"],
    socials: { linkedin: "https://linkedin.com/in/charlieb" },
    bio: "Charlie is a full-stack developer and team lead. With over 15 years in the industry, he mentors junior developers and contributes to open-source projects."
  }
];

const App = () => (
  <div className="app">
    <h1 className="title">Profile Cards</h1>
    <div className="wave-bg"></div>
    <div className="cards-container">
      {users.map((u) =>
        <ProfileCard
          key={u.email}
          name={u.name}
          age={u.age}
          email={u.email}
          avatarUrl={u.avatarUrl}
          badges={u.badges}
          socials={u.socials}
        >
          {u.bio}
        </ProfileCard>
      )}
    </div>
  </div>
);

export default App;
