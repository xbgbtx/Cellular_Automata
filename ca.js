const screen_width = 640;
const screen_height = 640;

const sim_width = 128;
const sim_height = 128;
const sim_size = sim_width * sim_height;

const state_count = 4;
const state_buffer_size = Math.pow ( state_count, 9 );

let state_buffer;

let sim_buffer_0, sim_buffer_1;

let randomise_state_button;

const a = 80;
const colors = [
    [ 0, 0, 0, a ],
    [ 50, 120, 255, a ],
    [ 0, 255, 250, a ],
    [ 120, 255, 250, a ],
    [ 240, 255, 250, a ],
];

function setup ()
{
    createCanvas ( screen_width, screen_height );
    
    sim_buffer_0 = new Uint8ClampedArray ( sim_size );
    sim_buffer_1 = new Uint8ClampedArray ( sim_size );

    state_buffer = new Uint8ClampedArray ( state_buffer_size );

    randomize_buffer ( state_buffer, state_count );
    randomize_buffer ( sim_buffer_0, state_count );

    colorMode ( HSB, 255 );

    randomise_state_button = createButton ( 'random rules' );
    randomise_state_button.position ( 20, screen_height + 100 );
    randomise_state_button.mousePressed ( () => 
    {
        randomize_buffer ( state_buffer, state_count );
        randomize_buffer ( sim_buffer_0, state_count );
    });
}

function draw () 
{
    noStroke ();

    sim_buffer_0.forEach ( ( val, idx, arr ) =>
    {
        draw_cell ( val, idx );

        let next_val = cell_next ( val, idx, arr );

        sim_buffer_1 [ idx ] = next_val;
    });

    flip_sim_buffers ();
    //noLoop ();
}

function flip_sim_buffers ()
{
    let tmp = sim_buffer_0;
    sim_buffer_0 = sim_buffer_1;
    sim_buffer_1 = tmp;
}


function cell_next ( val, idx, arr )
{
    let local_idxs = get_local_idxs ( idx, sim_width, sim_height );
    let local_vals = local_idxs.map ( l => arr [ l ] )

    let next_state = local_vals.reduce ( ( acc, val, idx ) =>
    {
        return acc | ( val << ( idx * 8 ) );
    });

    return state_buffer [ next_state ];
}

function draw_cell ( val, idx ) 
{
    fill ( ... colors [ val ]);

    let x = ( idx % sim_width ) * ( screen_width / sim_width );
    let y = Math.floor ( idx / sim_height ) * ( screen_height / sim_height );

    rect ( x, y, screen_width / sim_width, screen_height / sim_height );
}

function get_local_idxs ( idx, w, h )
{
    let i_x = idx % w;
    let i_y = Math.floor ( idx / w );

    //offset an x or y coord and wrap on grid
    let offs = ( v, m, a ) => ( v + m + ( a % m ) ) % m;

    //x,y to buffer idx
    let c2i = ( x, y ) => x + ( y * w );

    let adj = ( o_x, o_y ) => c2i ( offs ( i_x, w, o_x ),
                                    offs ( i_y, h, o_y ) );

    return [ 
        adj ( -1, -1 ), adj (  0, -1 ), adj (  1, -1 ),
        adj ( -1,  0 ), adj (  0,  0 ), adj (  1,  0 ),
        adj ( -1,  1 ), adj (  0,  1 ), adj (  1,  1 )
    ];

}

function randomize_buffer ( b, max )
{
    let off = 0.25;

    noiseSeed ( random () * 10000 );
    b.forEach ( ( v, i, a ) =>
    {
        //a [ i ] = floor ( random () * max ) );

        let n = noise ( ( i % sim_width ) * off,
                        floor ( i / sim_width ) * off );

        a [ i ] = floor ( n * max );
    });
}

