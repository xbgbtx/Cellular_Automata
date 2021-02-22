let screen_width = 640;
let screen_height = 640;

let sim_width = 64;
let sim_height = 64;

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
    //return idx % state_count;
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

function get_neighbour ( idx, n )
{
    let row_adj, col_adj;

    switch ( n )
    {
        case 0 : row_adj = -1; col_adj = -1; break;
        case 1 : row_adj = -1; col_adj =  0; break;
        case 2 : row_adj = -1; col_adj =  1; break;
        case 3 : row_adj =  0; col_adj = -1; break;
        case 4 : row_adj =  0; col_adj =  1; break;
        case 5 : row_adj =  1; col_adj = -1; break;
        case 6 : row_adj =  1; col_adj =  0; break;
        case 7 : row_adj =  1; col_adj =  1; break;
    }

    let n_idx = idx + row_adj * sim_width;

    if ( n_idx < 0 || n_idx > sim_size )
        return -1;

    if ( ( n_idx % sim_width ) + col_adj < 0      || 
         ( n_idx % sim_width ) + col_adj >= sim_width )
        return -1;

    return n_idx + col_adj;

}

function randomize_state_buffer ()
{
    state_buffer.forEach ( ( val, idx, arr ) 
        => arr [ idx ] = Math.floor ( Math.random () * state_count ) );
}

