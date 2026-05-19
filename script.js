// ============================================================
// Step 9 — Final Project
//
// Two things to do:
//   A) On page load: pick a random image for the header background.
//   B) When the user clicks "Shuffle", fill the 5 gallery slots with 5
//      DIFFERENT random images from the set of 20.
//
// ACCESSIBILITY NOTE
// Each gallery image carries meaning, so it needs descriptive alt text
// for screen readers. We store the alt text RIGHT NEXT TO the filename
// in the `images` array below — an "image" in our code is really an
// object with BOTH a src and an alt.
//
// The header background is decorative (it's set via CSS background-image,
// which screen readers correctly ignore), so it doesn't need alt text.
// ============================================================


// -------- THE IMAGES --------
// One object per image. Each has a `src` (where the file lives) and an
// `alt` (a short description of what's in the picture).
// REPLACE the alt text with descriptions of YOUR actual images.

const images = [
  { src: "https://umsicomplexwebdesign.github.io/site_photos/img1.jpg",  alt: "An intricate light pole design" },
 { src: "https://umsicomplexwebdesign.github.io/site_photos/img2.jpg",  alt: "Dublin potato famine monument" },
 { src: "https://umsicomplexwebdesign.github.io/site_photos/img3.JPG",  alt: "The class in front of Christchurch" },
 { src: "https://umsicomplexwebdesign.github.io/site_photos/img4.JPG",  alt: "A horse rider in Phoenix Park" },
 { src: "https://umsicomplexwebdesign.github.io/site_photos/img5.JPG",  alt: "The group in front of the Custom House" },
 { src: "https://umsicomplexwebdesign.github.io/site_photos/img6.JPG",  alt: "Two students listening to Dr. Darren Kelly" },
 { src: "https://umsicomplexwebdesign.github.io/site_photos/img7.JPG",  alt: "Guest Speaker – Anna McWilliams (RCSI Library Services)" },
 { src: "https://umsicomplexwebdesign.github.io/site_photos/img8.JPG",  alt: "Mosaic poster at IWA" },
 { src: "https://umsicomplexwebdesign.github.io/site_photos/img9.JPG",  alt: "Sign in front of The Bloody Stream Pub in Howth" },
 { src: "https://umsicomplexwebdesign.github.io/site_photos/img10.JPG", alt: "statue of a mermaid surrounded by grass and wildflowers" },
 { src: "https://umsicomplexwebdesign.github.io/site_photos/img11.JPG", alt: "Group with a sculpture of the Tayto mascot at a gas station" },
 { src: "https://umsicomplexwebdesign.github.io/site_photos/img12.JPG", alt: "stack of 17 colorful blocks stating the UN sustainable development goals" },
 { src: "https://umsicomplexwebdesign.github.io/site_photos/img13.JPG", alt: "Plaque in remembrance of Black ‘47, the worst year of Irish Famine" },
 { src: "https://umsicomplexwebdesign.github.io/site_photos/img14.png", alt: "group in front of the customs house in dublin" },
 { src: "https://umsicomplexwebdesign.github.io/site_photos/img15.JPG", alt: "Self Help Africa" },
 { src: "https://umsicomplexwebdesign.github.io/site_photos/img16.JPG", alt: "A monument in front of the ocean in Galway." },
 { src: "https://umsicomplexwebdesign.github.io/site_photos/img17.JPG", alt: "Great famine informational Board" },
 { src: "https://umsicomplexwebdesign.github.io/site_photos/img18.JPG", alt: "Sign describing the folklore of Nimmo’s pier on the Galway Waterway Trails" },
 { src: "https://umsicomplexwebdesign.github.io/site_photos/img19.JPG", alt: "Cliffs of Moher" },
 { src: "https://umsicomplexwebdesign.github.io/site_photos/img20.JPG", alt: "group in front of a phone booth in the Computer and Communications Museum" },
];

const GALLERY_SIZE = 5;


// -------- HELPERS --------

// Returns a random whole number from min to max INCLUSIVE.
// e.g. randomInt(0, 19) might return 0, 5, 12, or 19.
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Returns `count` UNIQUE random items from the array.
// Strategy: shuffle a copy of the array, then take the first `count` items.
function pickUniqueRandom(array, count) {
  // Make a copy so we don't change the original.
  const copy = array.slice();

  // Fisher–Yates shuffle (classic algorithm — don't worry about memorising it).
  for (let i = copy.length - 1; i > 0; i--) {
    const j = randomInt(0, i);
    // Swap copy[i] and copy[j]
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }

  return copy.slice(0, count);
}


// -------- PART A: random header background on page load --------

function setRandomHeader() {
  const header = document.querySelector("#siteHeader");

  // Pick one image at random from the array.
  const pick = images[randomInt(0, images.length - 1)];

  // .style lets us set CSS from JavaScript.
  // CSS "background-image" becomes "backgroundImage" in JS (camelCase).
  header.style.backgroundImage = `url('${pick.src}')`;

  // Header background is decorative, so no alt text needed.
  // (If you ever made this header background MEANINGFUL — e.g. the
  // banner is the only place that shows the page topic — you would
  // add aria-label to the <header>:
  //     header.setAttribute("aria-label", pick.alt);
  // )

  console.log("Header set to:", pick.src);
}


// -------- PART B: shuffle the gallery --------

function shuffleGallery() {
  // Pick 5 unique image OBJECTS (each with src + alt).
  const chosen = pickUniqueRandom(images, GALLERY_SIZE);
  console.log("Gallery now showing:", chosen.map(i => i.src));

  // Grab all 5 <img> elements.
  const galleryImgs = document.querySelectorAll(".gallery-img");

  // Loop through them and set BOTH src AND alt from the chosen image.
  galleryImgs.forEach(function (img, index) {
    img.src = chosen[index].src;
    img.alt = chosen[index].alt;   // <-- accessibility: alt travels with the image
  });
}


// -------- WIRE IT ALL UP --------

// Run once on page load.
setRandomHeader();
shuffleGallery();

// Make the button shuffle the gallery (NOT the header — header only changes on reload).
const shuffleBtn = document.querySelector("#shuffleBtn");
shuffleBtn.addEventListener("click", shuffleGallery);
