let screen_width = 640;
let screen_height = 640;

let sim_width = 64;
let sim_height = 64;
let sim_size = sim_width * sim_height;

let state_count = 3;
let state_buffer_size = Math.pow ( state_count, 9 );
let state_buffer;

let sim_buffer_0, sim_buffer_1;

function setup ()
{
    createCanvas ( screen_width, screen_height );
    
    sim_buffer_0 = new Uint8ClampedArray ( sim_size );
    sim_buffer_1 = new Uint8ClampedArray ( sim_size );

    state_buffer = new Uint8ClampedArray ( state_buffer_size );

    randomize_state_buffer ();

    colorMode ( HSB, 255 );
}

function draw () 
{
    noStroke ();

    sim_buffer_0.forEach ( ( val, idx, arr ) =>
    {
        let next_val = cell_next ( val, idx, arr );

        draw_cell ( next_val, idx );
    });

    let tmp = sim_buffer_0;
    sim_buffer_0 = sim_buffer_1;
    sim_buffer_1 = tmp;

    noLoop ();
}

function cell_next ( val, idx, arr )
{
    let local_vals = get_local_idxs ( idx ).map ( l => arr [ l ] )

    console.log ( local_vals );

    return idx % state_count;
    //return  Math.floor ( Math.random () * state_count );
}

function draw_cell ( val, idx ) 
{
    let c = map ( val, 0, state_count, 0, 255 );
    fill ( color ( c, 255, 255, 255 ) );

    rect ( ( idx % sim_width ) * ( screen_width / sim_width ), 
           Math.floor( idx / sim_height ) * ( screen_height / sim_height ),
        10, 10 );
}

function get_local_idxs ( idx )
{
    let i_x = idx % sim_width;
    let i_y = Math.floor ( idx / sim_height );

    let w = sim_width;
    let h = sim_height;

    //offset an x or y coord and wrap on grid
    let offs = ( v, m, a ) => ( v + m + ( a % m ) ) % m;

    //x,y to buffer idx
    let c2i = ( x, y ) => ( x % w ) + ( y * h );

    let adj = ( o_x, o_y ) => c2i ( offs ( i_x, w, o_x ),
                                    offs ( i_y, h, o_y ) );

    return [ 
        adj ( -1, -1 ), adj (  0, -1 ), adj (  1, -1 ),
        adj ( -1,  0 ), adj (  0,  0 ), adj (  1,  0 ),
        adj ( -1,  1 ), adj (  0,  1 ), adj (  1,  1 )
    ];

}

function randomize_state_buffer ()
{
    state_buffer.forEach ( ( val, idx, arr ) => arr [ idx ] = Math.floor ( Math.random () * state_count ) );
}

