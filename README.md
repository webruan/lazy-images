# Automatic Lazy Loading of Images by Section

This project offers a simple solution to enhance the performance of web pages by optimizing their loading time. The proposed script automates the image loading process. Only when the user reaches the corresponding section on the page, the image is loaded.

## How to Use

1. Place the script in your project's scripts folder.
2. Add divs with the class "img" and an ID identical to the image name in your project's folder.

```html
// For example, if you have an image named "sports_car".
// Then you should create a div wherever you want this image to appear, like this:
<div class="img" id="sports_car"></div>
```

This way, the script will automatically load the corresponding image when the user scrolls to the section where the image is located.

## Versions

Below, I'll share a bit of the code's evolution:

### Version 0.1
```JS
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
```

### Version 0.2
```JS
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
```

## Contributions

We welcome contributions to improve and expand this project. Feel free to provide ideas, suggest code improvements, or report issues on the project's page.

## System Requirements

The script can be executed on any system.

## Known Issues

If you encounter any problems, please report them on the project's page. We will do our best to resolve them promptly.

## License

This project is licensed under the [AGPL-3.0 License](LICENSE).

## Contact

For more information or clarification of doubts, visit [my GitHub profile](https://github.com/webruan).

## Learning Resources

[StackOverflow](https://stackoverflow.com/questions/34745048/which-method-is-faster-to-select-body-element)
* Selecting the body tag

[Developer Mozilla](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array)
* Building arrays 

[StackOverflow](https://stackoverflow.com/questions/617036/appending-to-an-object)
* Building objects

[StackOverflow](https://stackoverflow.com/questions/17094230/how-do-i-loop-through-children-objects-in-javascript)
* Iterating through child elements