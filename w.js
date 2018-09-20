var camera, scene, renderer, stats;
var SEPARATION = 100, AMOUNTX = 40, AMOUNTY = 40;
var camera, scene, renderer;
var particles, particle, count = 0;
var mouseX = 600, mouseY = -200;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var windowWidth = window.innerWidth;

init();
animate();

function init() {

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize( window.innerWidth, window.innerHeight); 
    renderer.setPixelRatio( window.devicePixelRatio );
    document.querySelector(".webgl-scene").appendChild( renderer.domElement );

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 5000 );
    camera.position.z = 1200;
    camera.position.x = 1500

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    scene = new THREE.Scene();
    scene.background = new THREE.Color("#000000");

    setupScene();

    document.querySelector(".webgl-scene").addEventListener( 'mousemove', onDocumentMouseMove, false );
    // document.querySelector(".webgl-scene").addEventListener( 'touchstart', onDocumentTouchStart, false );
    // document.querySelector(".webgl-scene").addEventListener( 'touchmove', onDocumentTouchMove, false );
    //
    window.addEventListener( 'resize', onWindowResize, false );
}
//
function setupScene () {

    var color = new THREE.Color("rgb(238, 28, 37)");
    // Setup some geometries
    particles = new Array();
    var geometry = new THREE.ConeGeometry( 1 , 2, 4);
    var material = new THREE.MeshBasicMaterial({
        // color: 0x404040,
        color: 0x999999,
        wireframe: true  

    });  

    var i = 0;
    for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
        for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
            particle = particles[ i ++ ] = new THREE.Mesh( geometry, material);
            particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
            particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
            scene.add( particle );
        }
    }
}
//
function onWindowResize() {
    if(window.innerWidth != windowWidth) {
        var aspect = window.innerWidth / window.innerHeight;
        camera.aspect = aspect;
        camera.updateProjectionMatrix();

        var dpr = renderer.getPixelRatio();
        renderer.setSize( window.innerWidth, window.innerHeight );
        windowWidth = window.innerWidth;
    }

}
//
function onDocumentMouseMove( event ) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
}
//
function onDocumentTouchStart( event ) {
    if ( event.touches.length === 1 ) {
        event.preventDefault();
        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        mouseY = event.touches[ 0 ].pageY - windowHalfY;
    }
}
//
function onDocumentTouchMove( event ) {
    if ( event.touches.length === 1 ) {
        event.preventDefault();
        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        mouseY = event.touches[ 0 ].pageY - windowHalfY;
    }
}
//
function animate() {

    requestAnimationFrame( animate );
    render();
}
//
function render() {
    camera.position.x += ( mouseX - camera.position.x ) * .05;
    camera.position.y += ( - mouseY - camera.position.y ) * .05;
    camera.lookAt( scene.position );
    var i = 0;
    for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
        for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
            particle = particles[ i++ ];
            particle.position.y = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) +
                            ( Math.sin( ( iy + count ) * 0.5 ) * 50 );
            particle.scale.x = particle.scale.y = particle.scale.z = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 4 +
                            ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 4;
        }
    }
    renderer.render( scene, camera );
    count += 0.1;
}
