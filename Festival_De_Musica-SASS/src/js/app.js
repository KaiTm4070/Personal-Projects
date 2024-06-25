document.addEventListener('DOMContentLoaded', function(){
    navFija();
    crearGaleria();
    resaltarEnlace();
    scrollNav();
})

function navFija(){
    const header = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');

    window.addEventListener('scroll', function(){
        if(sobreFestival.getBoundingClientRect().bottom < 1){
            header.classList.add('fixed')
        }else{
            header.classList.remove('fixed')
        }
    })
}

function crearGaleria(){
    const cantidad_img = 16; 
    const galeria =  document.querySelector('.galeria-imagenes');
    for (let i = 1; i <= cantidad_img; i++) {
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
        <source srcset="build/gallery/thumb/${i}.avif" type="image/avif">
        <source srcset="build/gallery/thumb/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/gallery/thumb/${i}.jpg" alt="imagen galeria">`;
        //Even Handler
        imagen.onclick = function(){
            mostrarImagen(i);
        }

        galeria.appendChild(imagen)
    }
}

function mostrarImagen(i){
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
    <source srcset="build/gallery/full/${i}.avif" type="image/avif">
    <source srcset="build/gallery/full/${i}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/gallery/thumb/${i}.jpg" alt="imagen galeria">`;

    //Generar modal
    const modal = document.createElement('div');
    modal.classList.add('modal');
    /* modal.onclick = cerrarModal; */
    modal.appendChild(imagen);

    //Boton cerrar modal
    const cerrarModalBtn = document.createElement('button');
    cerrarModalBtn.textContent = 'X';
    cerrarModalBtn.classList.add('btn-cerrar');
    cerrarModalBtn.onclick = cerrarModal;
    modal.appendChild(cerrarModalBtn);

    //agregar al HTML
    const body = document.querySelector('body');
    body.classList.add('overflow-hidden');
    body.appendChild(modal);
}

function cerrarModal(){
    const modal = document.querySelector('.modal');
    modal.classList.add('fade-out');
    setTimeout(() =>{
        modal?.remove()
        const body = document.querySelector('body');
        body.classList.remove('overflow-hidden');
    }, 500);

}

function resaltarEnlace(){
    document.addEventListener('scroll', () =>{
        const sections = document.querySelectorAll('section');
        const navList = document.querySelectorAll('.navegacion-principal a');
        let actual = '';
        sections.forEach(section =>{
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight; 
            if(window.scrollY >= (sectionTop - sectionHeight / 3 )){
                actual = section.id
            }
        })

        navList.forEach(list =>{
            list.classList.remove('active')
            if(list.getAttribute('href') === '#' + actual){
                list.classList.add('active');
            }
        })
    });    
}

function scrollNav(){
    const navLinks = document.querySelectorAll('.navegacion-principal a');
    navLinks.forEach(link =>{
        link.addEventListener('click', e =>{
            e.preventDefault();
            const sectionScroll = e.target.getAttribute('href');
            const section = document.querySelector(sectionScroll);

            section.scrollIntoView({behavior: 'smooth'});
        });
    })
}
