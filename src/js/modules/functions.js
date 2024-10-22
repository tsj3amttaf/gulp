// Экспорт функции
export function isWebp() {

    // Функция проверки webp
    function testWebP( callback ) {

        let webP = new Image();
        webP.onload = webP.onerror = function() {
            callback( webP.height == 2 );
        };

        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }

    // Добавление класса для тега <html>
    testWebP( function( support ) {
        
        // Условие, а я всегда использовал if else, а оказывается всё можно одной строкой записать
        let className = support === true ? 'webp' : 'no-webp';
        document.querySelector( 'html' ).classList.add( className );
    } );
}