import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import PopupWrapper from "../utilities/PopupWrapper";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  return (
    <div className="home-page">
      <header className="home-page-header">
        <h1>Alchimie des couleurs</h1>
      </header>
      <main className="home-page-main">
        <nav className="home-page-nav">
          <ul className="nav-list">
            <li>
              <Link to="/single-color">Analyse chromatique</Link>
            </li>
            <li>
              <Link to="/composition-of-two">Composition base bichrome</Link>
            </li>
            <li>
              <Link to="/composition-tool">Outils de composition</Link>
            </li>
          </ul>
        </nav>
        <div className="présentation">
          <PopupWrapper title="Bienvenue">
            <h2>Bienvenue</h2>
          </PopupWrapper>
          <p>
            <span>Alchimie des couleurs</span> est un site web qui permet de
            comprendre les principes de la théorie des couleurs tout en donnant
            des outils d'essais et de compréhension.
          </p>
          <p>
            Plusieurs pages d'outils sont disponibles pour vous aider à
            comprendre la théorie des couleurs tout en expérimentant:
          </p>
          <ul>
            <li>
              <p>
                <span>Analyse chromatique:</span> contient plusieurs schémas
                représentant différentes idées liées à une couleur séléctionnée
                et modifiable dynamiquement.
              </p>
            </li>
            <li>
              <p>
                <span>Composition base bichrome:</span> donne plusieurs outils
                de visualisation de composition entre deux couleurs aisément
                modifiable.
              </p>
            </li>
            <li>
              <p>
                <span>Outils de composition:</span> donne plusieurs outils de
                visualisation de composition entre au moins 3 couleurs
                séléctionnables.
              </p>
            </li>
          </ul>
          <p className="home-page-subText">
            --Un outil de recherche par nom de couleur est mis à disposition en
            haut à droite de la page.
          </p>
          <p className="home-page-subText">
            --Les titres de sections sont clickable pour plus d'informations.
          </p>
          <p className="home-page-subText">
            --Les valeurs hexadecimales sont copiables.
          </p>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
