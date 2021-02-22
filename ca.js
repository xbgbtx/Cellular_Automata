let screen_width = 640;
let screen_height = 640;

let sim_width = 64;
let sim_height = 64;

let buffer_0, buffer_1;

function setup ()
{
    createCanvas ( screen_width, screen_height );
    
    buffer_0 = new Uint8ClampedArray ( sim_width * sim_height );
    buffer_1 = new Uint8ClampedArray ( sim_width * sim_height );

    colorMode ( HSB, 255 );
}

function draw () 
{
    noStroke ();

    buffer_0.forEach ( ( val, idx ) =>
    {
        buffer_1 [ idx ] = Math.floor ( Math.random () * 255 );

        draw_cell ( idx, val );
    });

    let tmp = buffer_0;
    buffer_0 = buffer_1;
    buffer_1 = tmp;

    //noLoop ();
}

function draw_cell ( idx, val ) 
{
    fill ( color ( val, 255, 255, 255 ) );

    rect ( ( idx % sim_width ) * ( screen_width / sim_width ), 
           ( idx / sim_height ) * ( screen_height / sim_height ),
        10, 10 );
}

