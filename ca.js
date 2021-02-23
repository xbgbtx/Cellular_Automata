const screen_width = 512;
const screen_height = 512;

const sim_width = 64;
const sim_height = 64;
const sim_size = sim_width * sim_height;

const cell_width = screen_width / sim_width;
const cell_height = screen_height / sim_height;

let rule;

let sim_buffer_0, sim_buffer_1;

let randomise_state_button;

const a = 255;
const colors = [
    [ 0, 0, 0, a ],
    [ 50, 100, 255, a ],
    [ 240, 220, 200, a ],
    [ 190, 255, 250, a ],
    [ 240, 255, 250, a ],
];

let spontenaeity=0;

function setup ()
{
    let canvas = createCanvas ( screen_width, screen_height );
    canvas.parent ( "canvas_div" );
    
    sim_buffer_0 = new Uint8ClampedArray ( sim_size );
    sim_buffer_1 = new Uint8ClampedArray ( sim_size );

    //rule = new RockPaperScissors ();
    rule = new Life ();
    //rule = new Majority ();

    randomize_buffer ( sim_buffer_0, rule.states );
    colorMode ( HSB, 255 );
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

function randomize_button_click ()
{
    randomize_buffer ( sim_buffer_0, rule.states );
}

function rule_selection ()
{
    let el = document.getElementById ( "rule_select" );

    switch ( el.value )
    {
        case "life" : rule = new Life (); break;
        case "rps" : rule = new RockPaperScissors (); break;
        case "majority" : rule = new Majority (); break;
    }
    //:w
    //randomize_buffer ( sim_buffer_0, rule.states );
}

function spont_slider_move ()
{
    let el = document.getElementById ( "spont_slider" );
    spontenaeity = el.value;
}

function flip_sim_buffers ()
{
    let tmp = sim_buffer_0;
    sim_buffer_0 = sim_buffer_1;
    sim_buffer_1 = tmp;
}


function cell_next ( val, idx, arr )
{
    if ( random () >= spontenaeity )
    {
        let local_idxs = neighbours ( idx, sim_width, sim_height );
        let local_vals = local_idxs.map ( l => arr [ l ] )
        return rule.process_cell ( val, local_vals );
    }
    else
    {
        return ( val + 1 ) % rule.states;
    }
}

function draw_cell ( val, idx ) 
{
    fill ( ... colors [ val ]);

    let x = ( idx % sim_width ) * ( screen_width / sim_width );
    let y = Math.floor ( idx / sim_height ) * ( screen_height / sim_height );

    rect ( x, y, cell_width, cell_height );
}

function neighbours ( idx, w, h )
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
        adj ( -1,  0 ),                 adj (  1,  0 ),
        adj ( -1,  1 ), adj (  0,  1 ), adj (  1,  1 )
    ];

}

function randomize_buffer ( b, max )
{
    let off = 0.01 + random () * 0.5;

    noiseSeed ( random () * 10000 );
    b.forEach ( ( v, i, a ) =>
    {
        //a [ i ] = floor ( random () * max );

        let n = noise ( ( i % sim_width ) * off,
                        floor ( i / sim_width ) * off );

        a [ i ] = floor(map ( n, 0.1, 0.9, 0, max-0.01, true ));
        //a [ i ] = floor ( n * max );
    });
}

