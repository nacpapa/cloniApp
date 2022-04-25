import './welcome.css';

export default function Welcome() {
  return (
    <>
      <div className="welcome">
        <h1 className="welcomeTitle">
          Make <br /> your <br /> posts.
        </h1>
        <img className="welcomeImg" src="./img/welcome.svg" alt="welcome img" />
      </div>
    </>
  );
}
