const screen_width = 512;
const screen_height = 512;

let rule;

const a = 255;
const colors = [
    [ 0, 0, 0, a ],
    [ 50, 100, 255, a ],
    [ 240, 220, 200, a ],
    [ 190, 255, 250, a ],
    [ 240, 255, 250, a ],
];


let sim;
let spontenaeity=0;

function setup ()
{
    let canvas = createCanvas ( screen_width, screen_height );
    canvas.parent ( "canvas_div" );
    
    sim = new Sim ( 64, 64 );
    rule = new Life ();

    sim.randomize ( rule.states );
    colorMode ( HSB, 255 );
}

function draw () 
{
    noStroke ();

    sim.update ( rule, ( val, idx ) => draw_cell ( val, idx ) );

    //noLoop ();
}

function randomize_button_click ()
{
    sim.randomize ( rule.states );
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
}

function gridsize_selection ()
{
    let el = document.getElementById ( "gridsize_select" );
    let v = int ( el.value );
    sim = new Sim ( v, v );
    sim.randomize ( rule.states );
}

function spont_slider_move ()
{
    let el = document.getElementById ( "spont_slider" );
    spontenaeity = el.value;
}


function draw_cell ( val, idx ) 
{
    fill ( ... colors [ val ]);

    let x = ( idx % sim.width ) * ( screen_width / sim.width );
    let y = Math.floor ( idx / sim.height ) * ( screen_height / sim.height );

    let cell_width = screen_width / sim.width;
    let cell_height = screen_height / sim.height;

    rect ( x, y, cell_width, cell_height );
}

