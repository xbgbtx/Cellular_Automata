function page_loaded () 
{
    console.log ( "Cellular Automata starting..." );

    let pixi_app = init_pixi ();

    let ca_data = {
    }

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

function main_loop ( pixi_app, ca_data ) 
{
}
