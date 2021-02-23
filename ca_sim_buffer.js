
class Sim
{
    constructor ( w, h )
    {
        this.width = w;
        this.height = h;
        this.size = w * h;

        this.sim_buffer_0 = new Uint8ClampedArray ( this.size );
        this.sim_buffer_1 = new Uint8ClampedArray ( this.size );
    }

    randomize ( max )
    {
        let off = 0.01 + random () * 0.5;

        noiseSeed ( random () * 10000 );
        this.sim_buffer_0.forEach ( ( v, i, a ) =>
        {
            //a [ i ] = floor ( random () * max );

            let n = noise ( ( i % this.width ) * off,
                            floor ( i / this.width ) * off );

            a [ i ] = floor(map ( n, 0.1, 0.9, 0, max-0.01, true ));
            //a [ i ] = floor ( n * max );
        });
    }

    neighbours ( idx )
    {
        let w = this.width;
        let h = this.height;
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

    flip_sim_buffers ()
    {
            let tmp = this.sim_buffer_0;
            this.sim_buffer_0 = this.sim_buffer_1;
            this.sim_buffer_1 = tmp;
    }

    update ( rule, draw_cb )
    {
        this.sim_buffer_0.forEach ( ( val, idx, arr ) =>
        {
            draw_cb ( val, idx );

            let next_val = this.cell_next ( val, idx, arr, rule );

            this.sim_buffer_1 [ idx ] = next_val;
        });

        this.flip_sim_buffers ();
    }

    cell_next ( val, idx, arr, rule )
    {
        if ( random () >= spontenaeity )
        {
            let local_idxs = this.neighbours ( idx );
            let local_vals = local_idxs.map ( l => arr [ l ] )
            return rule.process_cell ( val, local_vals );
        }
        else
        {
            return ( val + 1 ) % rule.states;
        }
    }
}



