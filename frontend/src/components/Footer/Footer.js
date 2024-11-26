import React from "react";

import Container from "../UI/Container/Container";

import { ReactComponent as FooterLogo } from "../../assets/svg/logo_text.svg";

import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

import styles from "./Footer.module.scss";

const Footer = () => {
  const date = new Date();
  return (
    <footer className={styles.section__footer}>
      <Container>
        <section className={styles.footer__main}>
          <div className={styles.column}>
            <div className={styles.footer__logo}>
              <FooterLogo />
            </div>

            <div className={styles.footer__social}>
              <a
                href="https://pcampus.edu.np/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Link to Kamao's Facebook Page"
              >
                <FaFacebook className={styles.facebook} />
              </a>
              <a
                href="https://pcampus.edu.np/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Link to Kamao's Instagram Page"
              >
                <FaInstagram className={styles.instagram} />
              </a>
              <a
                href="https://pcampus.edu.np/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Link to Kamao's Linkedin Profile"
              >
                <FaLinkedin className={styles.linkedin} />
              </a>
              <a
                href="https://pcampus.edu.np/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Link to Kamao's Twitter Handle"
              >
                <FaTwitter className={styles.twitter} />
              </a>
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.footer__client}>
              <h4>For Client</h4>
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.footer__talent}>
              <h4>For Talent</h4>
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.footer__about}>
              <h4>About</h4>
              <ul className={styles.footer__about__list}>
                <li>About Us</li>
                <li>How it Works</li>
                <li>Our Story</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.footer__copyright}>
          <p className={styles.footer__cptext}>
            Copyright &copy; {date.getFullYear()} by Kamao, Inc. All rights
            reserved
          </p>
        </section>
      </Container>
    </footer>
  );
};

export default Footer;
