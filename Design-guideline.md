# Design Guideline — @lubos.volkov Style System

> Style extrait des ressources visuelles du dossier Luha.
> Deux thèmes principaux : **Dark** et **Light (Cream)** — les deux peuvent coexister dans un même produit.

---

## 1. COULEURS

### Thème Dark (fond sombre)

| Rôle | Nom | HEX | Usage |
|---|---|---|---|
| Background principal | Near Black | `#0D0D0D` | Fond de page, sections hero |
| Background secondaire | Dark Gray | `#141414` | Cards, sections alternées |
| Grid overlay | Grid Line | `#1C1C1C` | Lignes de grille décoratives |
| Texte principal | White | `#FFFFFF` | Titres, headlines |
| Texte secondaire | Off White | `#C8C8C8` | Corps de texte, sous-titres |
| Texte tertiaire | Muted | `#888888` | Labels, captions, notes |
| Accent Rouge | Coral Red | `#E84848` | Numéros, labels "Avoid", CTA warning |
| Accent Jaune | Vivid Yellow | `#F5E135` | Labels "Save", "Steal", highlights |
| Accent Bleu | Electric Blue | `#4B7BF5` | Sélections, boutons, liens actifs |
| Accent Vert | Neon Green | `#6BF56B` | Succès, validations (contexte) |

### Thème Light / Cream (fond clair)

| Rôle | Nom | HEX | Usage |
|---|---|---|---|
| Background principal | Warm Cream | `#F2EDE3` | Fond de page, sections claires |
| Background secondaire | Light Paper | `#EAE4D8` | Cards, sections alternées |
| Grid overlay | Grid Line | `#D8D2C6` | Lignes de grille décoratives |
| Texte principal | Near Black | `#1A1A1A` | Titres, headlines |
| Texte secondaire | Dark Gray | `#4A4A4A` | Corps de texte |
| Texte tertiaire | Medium Gray | `#888888` | Labels, captions |
| Accent Rouge | Coral Red | `#E84848` | Numéros, labels, warnings — identique au dark |
| Accent Bleu | Electric Blue | `#4B7BF5` | Sélections, boîtes de référence, liens |
| Accent Jaune | Vivid Yellow | `#F5E135` | Annotations, highlights |

### Couleurs Sémantiques (UI States)

| État | HEX | Usage |
|---|---|---|
| Success / Green | `#6FD98F` | Checkmarks, succès |
| Warning / Yellow | `#F5E84A` | Warnings pastel |
| Error / Red | `#FF5D5D` | Erreurs, states négatifs |
| Info / Blue | `#5B8AF5` | Informations neutres |

---

## 2. DÉGRADÉS

| Nom | Valeur CSS | Usage |
|---|---|---|
| Rainbow Tube | `linear-gradient(180deg, #FF4040, #FF8C00, #FFE135, #6BF56B, #4B7BF5, #A855F7)` | Éléments décoratifs, barres colorées |
| Pink Magenta | `linear-gradient(135deg, #FF4EC7, #E84848)` | Accents sport, énergie |
| Orange Gold | `linear-gradient(135deg, #FF8C00, #FFE135)` | Chaleur, optimisme |
| Blue Purple | `linear-gradient(135deg, #4B7BF5, #A855F7)` | Tech, startup, premium |
| Neon Green | `linear-gradient(135deg, #6BF56B, #B8F54E)` | Croissance, succès |
| Cyan Blue | `linear-gradient(135deg, #22D3EE, #4B7BF5)` | Data, digital, SaaS |
| Dark Vignette | `radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)` | Overlay photo hero |

---

## 3. TYPOGRAPHIE

### Familles de polices

| Rôle | Police | Style | Fallback |
|---|---|---|---|
| Display / Hero | **Bebas Neue** | Regular (= Bold par nature) | Impact, Anton |
| Titre condensé | **Anton** | Regular | Impact |
| Titre éditorial | **Playfair Display** | Black / Bold Italic | Georgia |
| Corps de texte | **Inter** | Regular 400, Medium 500 | system-ui |
| Annotations | **Caveat** | Regular (style manuscrit) | cursive |
| Monospace / Tech | **IBM Plex Mono** | Regular | monospace |

> **Règle d'or :** Max 2 familles par projet. Display + Body. Les annotations manuscrites comptent comme décoratives.

### Échelle typographique (scale ratio 1.4)

| Niveau | px | rem | Usage |
|---|---|---|---|
| Display XL | `61px` | `3.813rem` | Hero headline |
| Display L | `44px` | `2.750rem` | Section headline |
| H1 | `31px` | `1.938rem` | Titre de section |
| H2 | `22px` | `1.375rem` | Sous-titre |
| Body L | `16px` | `1.000rem` | Corps de texte principal |
| Body S / Caption | `11px` | `0.688rem` | Labels, notes, captions |

### Paramètres typographiques

| Paramètre | Valeur | Règle |
|---|---|---|
| Line height — Display | `105–110%` | Serré, impact maximal |
| Line height — Corps | `150–160%` | Confortable, lisible |
| Letter spacing — Display | `-0.02em` à `-0.04em` | Légèrement resserré |
| Letter spacing — Corps | `0` à `+0.01em` | Neutre |
| Letter spacing — Caps label | `+0.08em` à `+0.12em` | Ouvert pour les petits caps |
| Line length (body) | `45–75 caractères` | Jamais plus large |
| Font weight — Titres | `900` (Black) | Ultra-bold |
| Font weight — Corps | `400` (Regular) | Propre |
| Font weight — Accent | `600` (Semi Bold) | Hiérarchie |

---

## 4. ESPACEMENT & LAYOUT

### Échelle d'espacement (base 8px)

| Token | px | Usage |
|---|---|---|
| `space-1` | `4px` | Gap micro (icônes, badges) |
| `space-2` | `8px` | Gap interne composant |
| `space-3` | `12px` | Padding compact |
| `space-4` | `16px` | Padding standard |
| `space-6` | `24px` | Espace entre éléments proches |
| `space-8` | `32px` | Section interne |
| `space-12` | `48px` | Séparation de section (mobile) |
| `space-16` | `64px` | Séparation de section (desktop) |
| `space-24` | `96px` | Section hero, grand espace |

### Grille

| Contexte | Colonnes | Gutter | Margin |
|---|---|---|---|
| Mobile (< 480px) | 4 | 16px | 16px |
| Tablet (< 1024px) | 8 | 24px | 32px |
| Desktop (< 1920px) | 12 | 32px | 64px |

### Règles de layout

- **White space** = élément actif, pas du vide — l'espace crée la structure
- Espace **entre sections** toujours > espace **à l'intérieur** des sections
- Cards : un seul objectif par card, pas de contenu entassé
- Espacement mobile / desktop : scale up de 1.5–2× entre les deux

---

## 5. BORDER RADIUS

| Nom | px | Usage |
|---|---|---|
| Pill | `999px` | Boutons, badges, tags |
| Rounded L | `16px` | Cards, modals |
| Rounded M | `12px` | Inputs, panels |
| Rounded S | `8px` | Petits éléments, chips |
| Sharp | `0px` | Éléments éditoriaux, grilles |

---



### Grid de fond (overlay décoratif)
```css
.grid-bg {
  background-image:
    linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 40px 40px;
}
/* Pour le thème clair, utiliser rgba(0,0,0,0.05) */
```

### Numéros en accent rouge
Les numéros de liste / étapes utilisent la couleur `#E84848` en display font, très grande taille, en arrière-plan ou en superposition.

### Annotations manuscrites
Le texte de type "Note:", "Details:", annotations d'explication utilisent la police **Caveat** en couleur accent (rouge, jaune ou bleu selon le thème).

### Boutons "speech bubble"
Petits boutons arrondis (pill) avec texte court : "Find out", "Until now", "Steal These" — fond bleu `#4B7BF5`, texte blanc, ombre légère.

---

## 7. COMPOSANTS UI

### Bouton Primaire
```
Background : #4B7BF5  
Text : #FFFFFF, Inter Semi Bold 14px  
Border radius : 999px (pill)  
Padding : 10px 20px  
Hover : #3B6BF0 (légèrement plus sombre)
```

### Bouton Secondaire (outline)
```
Background : transparent  
Border : 1.5px solid currentColor  
Text : currentColor, Inter Medium 14px  
Border radius : 999px  
Padding : 10px 20px
```

### Tag / Badge
```
Background : rgba(255,255,255,0.1) [dark] / rgba(0,0,0,0.07) [light]  
Text : Inter Medium 11px, letter-spacing +0.08em  
Border radius : 999px  
Padding : 4px 12px
```

### Card
```
Background : #141414 [dark] / #EAE4D8 [light]  
Border radius : 16px  
Padding : 32px  
Border : 1px solid rgba(255,255,255,0.06) [dark] / rgba(0,0,0,0.08) [light]
```

### Input
```
Background : rgba(255,255,255,0.06) [dark] / rgba(0,0,0,0.05) [light]  
Border : 1.5px solid rgba(255,255,255,0.15) [dark]  
Border focus : 1.5px solid #4B7BF5  
Border radius : 12px  
Padding : 12px 16px  
Font : Inter Regular 16px
```

---

## 8. CONTRASTE & ACCESSIBILITÉ

| Combinaison | Ratio | Niveau |
|---|---|---|
| #FFFFFF sur #0D0D0D | ~20:1 | AAA ✅ |
| #1A1A1A sur #F2EDE3 | ~14:1 | AAA ✅ |
| #E84848 sur #0D0D0D | ~5.2:1 | AA ✅ |
| #4B7BF5 sur #FFFFFF | ~3.8:1 | AA large text ✅ |
| #F5E135 sur #0D0D0D | ~12:1 | AAA ✅ |

> **Règle :** Minimum AA (4.5:1) pour le texte normal, AA Large (3:1) pour les titres >18px.  
> Ne jamais utiliser #000000 pur — préférer `#1A1A1A` ou `#282828` (légèrement saturé).

---

## 9. PALETTE 60-30-10

| Part | Couleur | Rôle |
|---|---|---|
| 60% | Background (#0D0D0D ou #F2EDE3) | Fond général |
| 30% | Neutres (gris, blanc, near-black) | Structure, texte |
| 10% | Accent (#4B7BF5, #E84848, #F5E135) | CTA, highlights, attention |

---

## 10. VARIABLES CSS COMPLÈTES

```css
:root {
  /* === BACKGROUNDS === */
  --bg-dark:          #0D0D0D;
  --bg-dark-2:        #141414;
  --bg-light:         #F2EDE3;
  --bg-light-2:       #EAE4D8;

  /* === TEXT === */
  --text-white:       #FFFFFF;
  --text-off-white:   #C8C8C8;
  --text-dark:        #1A1A1A;
  --text-gray:        #888888;

  /* === ACCENTS === */
  --accent-red:       #E84848;
  --accent-blue:      #4B7BF5;
  --accent-yellow:    #F5E135;
  --accent-green:     #6BF56B;

  /* === SEMANTIC === */
  --success:          #6FD98F;
  --warning:          #F5E84A;
  --error:            #FF5D5D;

  /* === TYPOGRAPHY === */
  --font-display:     'Bebas Neue', 'Anton', Impact, sans-serif;
  --font-body:        'Inter', system-ui, sans-serif;
  --font-script:      'Caveat', cursive;
  --font-mono:        'IBM Plex Mono', monospace;

  /* === SPACING === */
  --space-1:   4px;
  --space-2:   8px;
  --space-3:   12px;
  --space-4:   16px;
  --space-6:   24px;
  --space-8:   32px;
  --space-12:  48px;
  --space-16:  64px;
  --space-24:  96px;

  /* === RADIUS === */
  --radius-pill:  999px;
  --radius-l:     16px;
  --radius-m:     12px;
  --radius-s:     8px;
}
```

---

## 11. TOKENS FIGMA RECOMMANDÉS

```
Colors/
  Brand/
    Primary     → #4B7BF5
    Accent-Red  → #E84848
    Accent-Yellow → #F5E135
  Background/
    Dark        → #0D0D0D
    Dark-2      → #141414
    Light       → #F2EDE3
    Light-2     → #EAE4D8
  Text/
    Primary-Dark  → #FFFFFF
    Primary-Light → #1A1A1A
    Muted         → #888888

Typography/
  Display/XL  → Bebas Neue / 61px / 105% line-height
  Display/L   → Bebas Neue / 44px / 108% line-height
  Heading/1   → Inter Black / 31px / 120% line-height
  Heading/2   → Inter Bold / 22px / 130% line-height
  Body/L      → Inter Regular / 16px / 150% line-height
  Caption     → Inter Medium / 11px / 140% line-height / +0.08em tracking

Spacing/
  1 → 4px  |  2 → 8px  |  3 → 12px  |  4 → 16px
  6 → 24px |  8 → 32px | 12 → 48px  | 16 → 64px
```
