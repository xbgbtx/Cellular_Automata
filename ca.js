const screen_width = 512;
const screen_height = 512;
const a = 255;
const colors = [
    [ 0, 0, 0, a ],
    [ 50, 100, 255, a ],
    [ 240, 220, 200, a ],
    [ 190, 255, 250, a ],
    [ 240, 255, 250, a ],
    [ 150, 130, 255, a ],
];


let sim;
let spontenaeity=0;
let rule;

function setup ()
{
    let canvas = createCanvas ( screen_width, screen_height );
    canvas.parent ( "canvas_div" );
    
    sim = new Sim ( 64, 64 );
    rule = new Life ();

    sim.randomize ( rule.states );
    colorMode ( HSB, 255 );
    noStroke ();
}

function draw () 
{
    let cell_width = screen_width / sim.width;
    let cell_height = screen_height / sim.height;

    let draw_cb = ( val, idx ) =>
    {
        fill ( ... colors [ val ]);


        let x = ( idx % sim.width ) * cell_width;
        let y = Math.floor ( idx / sim.height ) * cell_height;

        rect ( x, y, cell_width, cell_height );
    };

    sim.update ( rule, draw_cb );
}

