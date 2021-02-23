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


