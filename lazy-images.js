function isSectionVisible(element) {
  const { top, bottom, left, right } = element.getBoundingClientRect(); 

  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  const vertInView = (top <= windowHeight) && (bottom >= 0);
  const horInView = (left <= windowWidth) && (right >= 0);

  return vertInView && horInView;
}

const bodyElement = document.getElementsByTagName('body')[0];
const documentSections = bodyElement.querySelectorAll('section');

let sectionsList = []
let imgsList = []
let sectionImgs = []

documentSections.forEach(section => {
  sectionsList.push(section)
});

sectionsList.forEach(section => {
  const sectionInfo = {
    sectionTag: section,
    sectionId: section.id,
    images: []
  };
  
  imgNodes = section.getElementsByClassName('img');


  for (var i = 0; i < imgNodes.length; i++) {
    var img = imgNodes[i];
  
    imgsList.push(img)
    sectionInfo.images.push(img)
  }

  sectionImgs.push(sectionInfo);
})

function loadImages() { 
  sectionImgs.forEach(section => {

    if (isSectionVisible(section.sectionTag)) { 
      section.images.forEach(img => {
        const imgId = img.attributes.id.nodeValue;
        const imgContainer = document.getElementById(imgId); 
        
        if (imgContainer) {
          imgContainer.innerHTML = 
          `
            <picture>
              <source media="(min-width: 1200px)" srcset="./${imgId}.webp">
              <source media="(min-width: 768px)" srcset="./${imgId}.webp">
              <source media="(min-width: 320px)" srcset="./${imgId}.webp">
              <img loading="lazy" src="./${imgId}.webp">
            </picture>
          `;
        }
      })
    }
    window.removeEventListener('scroll', loadImages);
  })  
}

window.addEventListener('scroll', loadImages);