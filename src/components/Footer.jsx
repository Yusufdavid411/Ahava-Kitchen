import { socials } from "../data/socials";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <h3>Ahava Kitchen</h3>
        <p>Sweet Taste Meets Excellence</p>
      </div>

      <div className="footer-socials">
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.link}
            target="_blank"
            rel="noreferrer"
          >
            {social.name}
          </a>
        ))}
      </div>

      <p className="footer-copy">
        © {new Date().getFullYear()} Ahava Kitchen. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;