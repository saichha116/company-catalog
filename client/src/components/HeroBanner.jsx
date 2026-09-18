import bannerImage from "../assets/service image.jpg";

function HeroBanner() {
  return (
    <section
      className="hero-banner"
      style={{
        backgroundImage: `url(${bannerImage})`,
      }}
    >
      <div className="hero-overlay">
        <h1>Services</h1>

        <p>Professional Printing Solutions</p>
      </div>
    </section>
  );
}

export default HeroBanner;