import React from "react";

export const TrianglesComparatifs = (
  <p>
    Cette section présente des triangles ayant chacun 3 couleurs. Chacune des
    triades représente un système de couleurs différent. La mise en contexte de
    la couleur sélectionnée dans chacun des triangles permet de mieux comprendre
    comment cette couleur peut interagir visuellement avec les autres couleurs
    du triangle.
  </p>
);

export const CarrésDeContrasteSimultané = (
  <p>
    Cette section présente 4 paires de carrés. Chaque paire, de par la loi du
    contraste simultané des couleurs, permet de mettre en contexte la couleur
    sélectionnée avec :
    <ul>
      <li>du noir</li>
      <li>du blanc</li>
      <li>un gris</li>
      <li>sa couleur complémentaire</li>
    </ul>
  </p>
);

export const HarmoniesTriadique = (
  <p>
    Cette section présente les harmonies triadiques de la couleur sélectionnée :
    <ul>
      <li>
        Gauche : Vraie triade, les couleurs forment un triangle équilatéral sur
        la roue des couleurs.
      </li>
      <li>
        Milieu : Complémentaire adjacent, les couleurs forment un triangle
        isocèle sur la roue des couleurs. Les deux couleurs de la base sont
        analogues à la couleur complémentaire.
      </li>
      <li>
        Droite : Analogues, les couleurs générées sont proches, à équidistance
        et de part et d'autre de la couleur sélectionnée.
      </li>
    </ul>
  </p>
);

export const HarmoniesTétradique = (
  <p>
    Cette section présente les harmonies tétradiques de la couleur sélectionnée
    :
    <ul>
      <li>
        (Chaque tétrade est composée de 2 axes de couleurs complémentaires.)
      </li>
      <li>
        Centre : Vraie tétrade, les couleurs forment un carré sur la roue des
        couleurs.
      </li>
      <li>
        Gauche et droite : Tétrade rectangulaire, les couleurs forment un
        rectangle sur la roue des couleurs. Les deux rectangles sont positionnés
        en miroir selon l'axe de la couleur sélectionnée et sa complémentaire.
      </li>
    </ul>
  </p>
);

export const TensionEtEquilibre = (
  <>
    <p>
      Cette section s'inspire d'un concept imaginé par Goethe : il s'agit des
      valeurs de lumière des couleurs les unes par rapport aux autres. C'est une
      approche sensible de la couleur ; ces ratios ne sont pas universels. Les
      couleurs, à même saturation et luminosité, peuvent créer des impressions
      sensibles de luminosités différentes. Par exemple, le violet sera perçu
      plus foncé que le jaune.
    </p>
    <p>
      Partant de ce principe, les ratios suivants sont calculés grâce à leur
      luminosité réelle et leur luminosité perçue selon le principe expliqué :
    </p>
    <ul>
      <li>
        (Étant calculés selon des valeurs arbitraires, ces ratios sont à titre
        indicatif.)
      </li>
      <li>
        Ratio lumineux : Les couleurs sont plus ou moins spatialement dominantes
        selon à quel point elles sont lumineuses.
      </li>
      <li>
        Ratio sombre : Les couleurs sont plus ou moins spatialement dominantes
        selon à quel point elles sont sombres.
      </li>
    </ul>
  </>
);

export const températureOpposée = (
  <>
    <p>
      Met en perspective la couleur sélectionnée avec des couleurs appartenant à
      la moitié opposée de la roue chromatique.
    </p>
    <p>
      Les couleurs tirant vers le rouge sont dites chaudes ; les couleurs tirant
      vers le bleu sont dites froides.
    </p>
    <p>
      La transition chaud-froid étant arbitraire, les verts et les violets
      donnent les couleurs de transitions opposées.
    </p>
  </>
);

export const Gradients = (
  <p>
    Cette section présente :
    <ul>
      <li>Un chemin vers la couleur complémentaire</li>
      <li>L'autre chemin vers la couleur complémentaire</li>
      <li>Un chemin vers la couleur opposée</li>
      <li>L'autre chemin vers la couleur opposée</li>
      <li>Le chemin vers la couleur opposée passant par le gris</li>
      <li>Un gradient des valeurs L de HSL</li>
      <li>Un gradient des valeurs V de HSV</li>
      <li>Des gradients des valeurs S de HSV et HSL</li>
    </ul>
    PS : L'opposée est la complémentaire de luminosité opposée.
  </p>
);

export const MélangeDeCouleurs = (
  <p>
    Outil permettant un mélange de 2 couleurs analogue au mélange de couleurs en
    peinture traditionnelle.
    <br />
    Le calcul n'est pas parfait et ne reproduit donc pas exactement le mélange
    de couleurs en peinture traditionnelle.
    <br />
    Les carrés de couleurs permettent de visualiser la relation entre les 2
    couleurs et leurs mélanges.
  </p>
);

export const HarmoniesDeRatio = (
  <p>
    Ce ratio suit le principe de la section "Tension et équilibre entre les
    pôles de luminosité" de la page "Analyse chromatique".
    <br />
    Le ratio est entre les 3 couleurs de cette page : la couleur mélangée et les
    couleurs sélectionnées.
  </p>
);

export const GradientsVersLesCouleursComplémentaires = (
  <p>
    Cette section présente les gradients vers les complémentaires de chaque
    couleur de la page.
  </p>
);

export const compositionRatio631 = (
  <p>
    Cet outil utilise 3 couleurs et génère une palette de 3 couleurs en
    utilisant le ratio 6-3-1.
    <br />
    Le ratio 6-3-1 est un ratio de composition très utilisé pour la composition
    chromatique de personnages.
    <br />
    Des carrés de composition sont présents pour mettre visuellement en relation
    les 3 couleurs choisies.
  </p>
);

export const OutilDanalyseDintermédiaires = (
  <p>
    Cet outil utilise 3 valeurs :
    <ul>
      <li>2 couleurs de base</li>
      <li>Une couleur cible</li>
    </ul>
    Selon la position du curseur, les couleurs intermédiaires seront soit plus
    proches de la valeur cible, soit plus proches de leur couleur de base
    respective.
  </p>
);

export const configurableContrast = (
  <p>
    Cet outil permet de configurer un ratio de contraste entre minimum 3
    couleurs.
    <br />3 autres couleurs peuvent être ajoutées individuellement à ce ratio.
  </p>
);

export const multipleColorMixing = (
  <p>
    Cet outil permet :
    <ul>
      <li>De mélanger par paires les 3 couleurs choisies.</li>
      <li>
        De mélanger le 1er résultat avec la couleur n'ayant pas été utilisée
        dans le mélange.
      </li>
    </ul>
  </p>
);

export const colorExploration = (
  <>
    <p>
      Cet outil permet de générer et d'explorer des palettes de 3 couleurs avec
      un contrôle précis sur chacune d'elles.
    </p>
    <p>
      <strong>Couleur de départ :</strong> Peut être générée aléatoirement ou
      choisie manuellement via le sélecteur de couleur.
    </p>
    <p>
      <strong>Couleur secondaire :</strong>
      <ul>
        <li>
          <em>Mode complémentaire :</em> Utilise la teinte complémentaire de la
          couleur de départ.
        </li>
        <li>
          <em>Mode personnalisé :</em> Permet de choisir une teinte spécifique
          (0-360°).
        </li>
        <li>
          <em>Luminosité et saturation :</em> Ajustables de -100 à 200, où 0 =
          identique à la couleur de départ, 100 = valeur opposée, les valeurs
          négatives tendent vers l'extrême dans la même direction, et les
          valeurs au-dessus de 100 tendent vers l'extrême opposé.
        </li>
      </ul>
    </p>
    <p>
      <strong>Couleur tertiaire :</strong>
      <ul>
        <li>
          <em>Aléatoire :</em> Teinte aléatoire avec saturation et luminosité
          moyennes.
        </li>
        <li>
          <em>Chemin court :</em> Couleur intermédiaire entre les deux premières
          par le chemin le plus court sur la roue chromatique.
        </li>
        <li>
          <em>Chemin long :</em> Couleur intermédiaire entre les deux premières
          par le chemin le plus long sur la roue chromatique.
        </li>
        <li>
          {" "}
          En mode complémentaire, le chemin long et court suivent le principe de
          l'harmonie tétradique (voir page Analyse chromatique).
        </li>
      </ul>
    </p>
    <p>
      Les compositions et gradients présentés permettent de visualiser les
      relations entre les couleurs générées.
    </p>
  </>
);
