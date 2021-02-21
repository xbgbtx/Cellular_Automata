function page_loaded () 
{
    console.log ( "Cellular Automata starting..." );

    let pixi_app = init_pixi ();

    let ca_data = init_ca_data ( 800, 800 );

    pixi_app.stage.addChild ( ca_data.sprite );

    pixi_app.ticker.add ( () =>
    {
        main_loop ( pixi_app, ca_data );
    });
}

function init_pixi ()
{
    let type="WebGL";
    
    if ( !PIXI.utils.isWebGLSupported () )
    {
        type = "canvas";
    }

    PIXI.utils.sayHello ( type );

    pixi_app = new PIXI.Application (
    {
        width  : 800,
        height : 800
    });

    document.getElementById ( "canvas_div" ).appendChild ( pixi_app.view );


    return pixi_app;
}

function init_ca_data ( width, height ) {
    let ca_data = {
        width       : width,
        height      : height,
        buffer      : undefined,
        texture     : undefined,
        sprite      : undefined
    }

    ca_data.buffer = new Uint8ClampedArray ( width * height * 3 );

    ca_data.texture = make_sim_texture ( ca_data );

    ca_data.sprite = new PIXI.Sprite ( ca_data.texture );

    return ca_data;
}

function make_sim_texture ( ca_data ) 
{
    if ( ca_data.texture != undefined )
    {
        ca_data.texture.destroy ( true );
    }

    return PIXI.Texture.fromBuffer ( 
        ca_data.buffer, ca_data.width, ca_data.height, 
        { format : PIXI.FORMATS.RGB } );
}

function main_loop ( pixi_app, ca_data ) 
{
    ca_data.buffer = ca_data.buffer.map ( 
        ( val, idx, arr ) => 
        {
            return Math.floor ( Math.random () * 255 );
        });

    ca_data.sprite.texture = make_sim_texture ( ca_data );
}
