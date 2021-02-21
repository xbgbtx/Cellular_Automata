let width = 800;
let height = 600;

let buffer_0, buffer_1;

function setup ()
{
    createCanvas ( width, height );
    
    buffer_0 = new Uint8ClampedArray ( width * height * 4 );
    buffer_1 = new Uint8ClampedArray ( width * height * 4 );
}

function draw () 
{
    loadPixels ();

    buffer_0.forEach ( ( val, idx ) =>
    {
        buffer_1 [ idx ] = Math.floor ( Math.random () * 255 );
    });

    let tmp = buffer_0;
    buffer_0 = buffer_1;
    buffer_1 = tmp;

    pixels.forEach ( ( val, idx, arr ) => 
    {
        pixels [ idx ] = buffer_0 [ idx ];
    });

    updatePixels ();
    
    //noLoop ();
}
