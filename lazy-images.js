function isSectionVisible(element) {
  let { top, bottom, left, right } = element.getBoundingClientRect(); 

  let windowHeight = window.innerHeight || document.documentElement.clientHeight;
  let windowWidth = window.innerWidth || document.documentElement.clientWidth;

  let vertInView = (top <= windowHeight) && (bottom >= 0);
  let horInView = (left <= windowWidth) && (right >= 0);

  return vertInView && horInView;
}

function getDocumentElements() {
  let bodyElement = document.getElementsByTagName('body')[0];
  let documentSections = bodyElement.querySelectorAll('section');
  let sectionsList = [];

  const sectionImgs = [];

  documentSections.forEach(section => {
    sectionsList.push(section);
  });

  sectionsList.forEach(section => {
    const sectionInfoObject = {
      sectionTag: section,
      sectionId: section.id,
      images: []
    };
    
    imgDiv = section.getElementsByClassName('img');
  
    for (var i = 0; i < imgDiv.length; i++) {
      let divImgId = imgDiv[i];

      sectionInfoObject.images.push(divImgId);
    };
  
    sectionImgs.push(sectionInfoObject);
  });

  return sectionImgs;
}

function loadImages(sectionImgs) { 
  sectionImgs.forEach(section => {
    if (isSectionVisible(section.sectionTag) && !section.sectionTag.classList.contains('processed')) { 
      section.images.forEach(img => {
        let imgId = img.attributes.id.nodeValue;
        let imgDivElement = document.getElementById(imgId); 
        
        if (imgDivElement) {
          imgDivElement.innerHTML = 
          `
            <picture>
              <source media="(min-width: 1200px)" srcset="./${imgId}.webp">
              <source media="(min-width: 768px)" srcset="./${imgId}.webp">
              <source media="(min-width: 320px)" srcset="./${imgId}.webp">
              <img loading="lazy" src="./${imgId}.webp">
            </picture>
          `;
        }
      });
      section.sectionTag.classList.add('processed');
    }
  });
}

window.addEventListener('scroll', () => {
  let imgsElement = getDocumentElements();
  loadImages(imgsElement);
});