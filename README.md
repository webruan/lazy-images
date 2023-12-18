# Lazy Loading Automático de Imagens por Seção

Este projeto oferece uma solução simples para melhorar o desempenho das páginas web, otimizando o tempo de carregamento da mesma. O script proposto aborda o carregamento de forma automática de imagens. Somente quando o usuário atinge a seção correspondente na página a imagem é carregada.

## Como Usar

1. Coloque o script na pasta de scripts do seu projeto.
2. Adicione divs com a classe "img" e um ID correspondente e identico ao nome da imagem na pasta do projeto.

```html
// Por exemplo, você possui uma imagem com o nome, "carro_esportivo".
// Então você deve criar uma div onde quer que essa imagem apareça, da seguinte forma:
<div class="img" id="carro_esportivo"></div>
```

Dessa forma o script carregará automaticamente a imagem referente quando o usuário rolar até a seção onde a imagem se encontra.

## Versões

Abaixo compartilho um pouco da evolução do código:

### version 0.1
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

## Contribuições

Estamos abertos a contribuições para melhorar e expandir este projeto. Sinta-se à vontade para dar ideias, sugerir melhorias no código ou relatar problemas na página do projeto.

## Requisitos do Sistema

O script pode ser executado em qualquer sistema.

## Problemas Conhecidos

Se encontrar algum problema, por favor, relate na página do projeto. Faremos o possível para resolver rapidamente.

## Licença

Este projeto é licenciado sob a [Licença AGPL-3.0](LICENSE).

## Contato

Para mais informações ou esclarecimento de dúvidas, visite [meu perfil no GitHub](https://github.com/webruan).

## Recursos de Aprendizado

[StackOverflow](https://stackoverflow.com/questions/34745048/which-method-is-faster-to-select-body-element)
* Seleção da tag body

[Developer Mozilla](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array)
* Construção de arrays 

[StackOverflow](https://stackoverflow.com/questions/617036/appending-to-an-object)
* Construção de objetos

[StackOverflow](https://stackoverflow.com/questions/17094230/how-do-i-loop-through-children-objects-in-javascript)
* Interação através dos elementos filhos 