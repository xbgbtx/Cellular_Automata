class Life
{
    constructor ()
    {
        this.states = 2;
    }

    process_cell ( cell, neighbours )
    {
        let alive_neighbours = neighbours.reduce ( ( a, v ) =>
        {
            return a + ( v == 1 );
        }, 0);

        if ( cell == 0 && alive_neighbours == 3 )
            return 1;
        if ( cell == 1 && ( alive_neighbours == 2 || alive_neighbours == 3 ))
            return 1;
        return 0;
    }
}

class Majority
{
    constructor ()
    {
        this.states = 3;
    }

    process_cell ( cell, neighbours )
    {
        let r=0, g=0, b=0;

        for ( const n of neighbours )
        {
            switch ( n )
            {
                case 0: r+=1; break;
                case 1: g+=1; break;
                case 2: b+=1; break;
            }
        }

        switch (  Math.max ( r, g, b ) )
        {
            case r : return 0;
            case g : return 1;
            case b : return 2;
        }
    }
}

class RockPaperScissors
{
    constructor ()
    {
        this.states = 3;
    }

    process_cell ( cell, neighbours )
    {
        let r=0, g=0, b=0;

        for ( const n of neighbours )
        {
            switch ( n )
            {
                case 0: r+=1; break;
                case 1: g+=1; break;
                case 2: b+=1; break;
            }
        }

        switch ( cell )
        {
            case 0 : 
                if ( g > 3 )
                    return 1;
                break;
            case 1 : 
                if ( b > 3 )
                    return 2;
                break;
            case 2 : 
                if ( r > 3 )
                    return 0;
                break;
        }

        return cell;
    }
}
