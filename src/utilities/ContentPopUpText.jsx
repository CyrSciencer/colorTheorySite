import React from "react";

export const TrianglesComparatifs = (
  <p>
    Cette section présente des triangles ayant chaqu'un 3 couleurs, chaqune des
    triade représente un systeme de couleurs différent. la mise en contexte de
    la couleur sélectionnée dans chacun des triangles permet de mieux comprendre
    comment cette couleur peut intéragir visuellement avec les autres couleurs
    du triangle.
  </p>
);

export const CarrésDeContrasteSimultané = (
  <p>
    Cette section présente 4 paires de carrés. chaque paires, de part la Loi du
    contraste simultané des couleurs, permet de mettre en context la couleur
    sélectionnée avec:
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
    Cette section présente les harmonies triadiques de la couleur sélectionnée:
    <ul>
      <li>
        gauche : Vrais triade, les couleurs forment un triangle equilateral sur
        la roue des couleurs.
      </li>
      <li>
        milieu : Complémentaire adjacent, les couleurs forment un triangle
        isocèle sur la roue des couleurs, les deux couleurs de la base sont
        analogues à la couleur complémentaire.
      </li>
      <li>
        droite : Analogues, les couleurs générées sont proches, à équidistance
        et de part et d'autre de la couleur sélectionnée.
      </li>
    </ul>
  </p>
);

export const HarmoniesTétradique = (
  <p>
    Cette section présente les harmonies tétradiques de la couleur sélectionnée:
    <ul>
      <li>
        ( chaque tétrade est composée de 2 axes de couleurs complémentaires.)
      </li>
      <li>
        centre : Vrais tétrade, les couleurs forment un carré sur la roue des
        couleurs.
      </li>
      <li>
        gauche et droite : tétrade rectangulaire, les couleurs forment un
        rectangle sur la roue des couleurs, les deux réctangles sont positionné
        en mirroir selon l'axe de la couleur selectionnée et sa complémentaire.
      </li>
    </ul>
  </p>
);

export const TensionEtEquilibre = (
  <>
    <p>
      Cette section s'inspire d'un concept imaginé par Goethe, il s'agit des
      valeurs de lumière des couleurs les une par rapport aux autres. C'est une
      approche sensible de la couleur, ces ratio ne sont pas universels. les
      couleurs, à meme saturation et luminosité, peuvent crées des impressions
      sensible de luminositées différentes, par exemple le violet sera perçu
      plus foncé que le jaune.
    </p>
    <p>
      partant de ce principe, les ratio suivant sont calculé selon leur
      luminosité réelle et leur luminosité percu selon le principe expliqué:
    </p>
    <ul>
      <li>
        (étant calculé selon des valeurs arbitraires, ces ratios sont a titre
        indicatif)
      </li>
      <li>
        Ratio lumineux : les couleurs sont plus ou moins spacialement dominante
        selon à quel point elles sont lumineuses.
      </li>
      <li>
        Ratio sombres : les couleurs sont plus ou moins spacialement dominante
        selon à quel point elles sont sombres.
      </li>
    </ul>
  </>
);

export const températureOpposée = (
  <>
    <p>
      Met en perspective la couleur sélectionnée avec des couleurs appartenant à
      la motié opposée de la roue chromatique.
    </p>
    <p>
      les couleurs tirant vers le rouge sont dites chaudes, les couleurs tirant
      vers le bleu sont dites froides.
    </p>
    <p>
      la transition chaud-froid étant arbitraire les vert et les violets donne
      les couleurs de transitions opposées.
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
      <li>un gradient des valeurs L de HSL</li>
      <li>un gradient des valeurs V de HSV</li>
      <li>des gradients des valeurs S de HSV et HSL</li>
    </ul>
    ps: l'opposée est la complémentaire de luminositée opposée.
  </p>
);

export const MélangeDeCouleurs = (
  <p>
    Outil permettant un mélange de 2 couleurs analogue au mélange de couleur en
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
    Ce ratio suis le principe de la section "Tension et équilibre entre les
    pôles de luminosité" de la page "Analyse chromatique".
    <br />
    le ratio est entre les 3 couleurs de cette page, la couleur mélangée et les
    couleurs séléctionnées.
  </p>
);

export const GradientsVersLesCouleursComplémentaires = (
  <p>
    Cette section présente les Grandients vers les complémentaires de chaque
    couleurs de la page.
  </p>
);

export const compositionRatio631 = (
  <p>
    Cet outil utilise 3 couleurs de base et génère une palette de 3 couleurs en
    utilisant le ratio 6-3-1.
    <br />
    le ratio 6-3-1 est un ratio de composition très utilisé pour la composition
    chromatique de personnages.
    <br />
    Des carrés de compositions sont présent pour mettre visuellement en relation
    les 3 couleurs choisies.
  </p>
);

export const OutilDanalyseDintermédiaires = (
  <p>
    Cet outil utilise 3 valeurs:
    <ul>
      <li>2 couleurs de bases</li>
      <li>Une couleur cible</li>
    </ul>
    Selon la valeur du curseur, les couleurs intermédiaires seront soit plus
    proche de la valeur cible soit plus proche de leur couleur de base
    respective.
  </p>
);

export const configurableContrast = (
  <p>
    Cet outil permet de configurer un ratio de contraste entre minimum 3
    couleurs.
    <br />3 autres couleurs peuvent être ajoutées individuellement à se ratio.
  </p>
);

export const multipleColorMixing = (
  <p>
    Cet outil permet:
    <ul>
      <li>de mélanger par paire les 3 couleurs choisies.</li>
      <li>
        de mélanger le 1er résultat avec la couleur n'ayant pas été utilisée
        dans le mélange.
      </li>
    </ul>
  </p>
);

export const colorExploration = (
  <p>
    Cet outil permet de mettre en relation:
    <ul>
      <li>une couleur aléatoire</li>
      <li>sa couleur opposée</li>
      <li>Une couleur aléatoire de luminosité intermédiaire</li>
    </ul>
    la génération aléatoire n'est pas obligatoire, cette valeur peut être
    modifiée en clickant dans le carré de contour blanc à coté de la valeur
    aléatoire.
  </p>
);

export const colorExperimentation = (
  <p>
    Cet outil peut générer 2 couleurs aléatoires de luminositées opposées et une
    3 ème couleur de luminosité intermédiaire.
    <br />
    Usage:
    <ul>
      <li>Modifier la couleur première modifie les 2 autres couleurs.</li>
      <li>
        Modifier la couleur luminosité opposée ne modifie que la couleur
        dérivée.
      </li>
    </ul>
  </p>
);
