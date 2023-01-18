import * as Samples from './music_samples.js'
import * as MusicUtils from './music_utils.js'


$(document).ready(function(){

    var chords_to_play = $('#n_chords_sel').val();
    var chord_prog, scale, BPM = $('input[name = "bpm_val"]').val();
    var chord_octave;
    generate_notes(true);


    var melody_only = false;


    var mouse_down = false;

    for(var i = 0; i < 10; i++){
        $('.music_tab').append('<tr>');
    }

    for(var i = 0; i < 10; i++){
        $('.music_tab tr').append('<td>');
    }

    $('.music_tab').on('mousedown', 'td', function (ev){
        if(ev.which === 1){
            $(this).toggleClass('selected');
            $(this).removeClass('locked');
            mouse_down = true;
        }
    });

    $(document).mouseup(function() {
        mouse_down = false;
    });

    $('.music_tab').on('mouseover', 'td',function(){
        if(mouse_down){
            $(this).toggleClass('selected');
            $(this).removeClass('locked');
        }
    });

    //ms=60,000/BPM * T
    //60,000 (ms) ÷ BPM = ms per beat/duration of a quarter note
    var inter;
    $('#play_pause').click(function(){

        if($(this).hasClass('fa-play')){
            $(this).siblings('p').text('Pause');
            play_table();
            inter = setInterval(play_table, 60000 / BPM);
        }
        else{
            $(this).siblings('p').text('Play');
            clearInterval(inter);
            inter = false;
        }

        $(this).toggleClass('fa-play fa-pause')
    });


    let playing_col = 0;
    let table_length = $('.music_tab tr:first-child').children('td').length;
    const rows = $('.music_tab').children('tr');
    const table_height = rows.length;

    function play_table(){
        //console.log(table_length);

        rows.each(function(index){
            //console.log($(this).children('td')[j]);
            var prev = get_left_col(playing_col);

            $(this).children('td')[prev].classList.remove('playing');
            $(this).children('td').eq(prev).html('');
            $(this).children('td')[playing_col].classList.add('playing');

            if($(this).children('td').eq(playing_col).hasClass('selected')
                && !$(this).children('td').eq(playing_col).hasClass('muted')){

                $(this).children('td').eq(playing_col).html('<i class=\"fa-solid fa-music\"></i>');

                play_note(index);
            }

        });
        playing_col = get_right_col(playing_col);
        if(playing_col == 0)
            progress_generation();
    }

    $('#reset_tab').click(function (){
        rows.children('td').removeClass('selected locked to_add to_remove');

    });

    $('#stop_music').click(function (){
        if($('#play_pause').hasClass('fa-pause'))
                $('#play_pause').trigger('click');
        rows.children('td').removeClass('playing');
        rows.children('td').html('');
        playing_col = 0;
    });

    $('#debug').mousedown(function (ev){
       if(ev.which === 1){
           rows.each(function (index){
               for(var x = 0; x < table_length; x ++)
                   $(this).children('td').eq(x).html(count_cell_neighbours(index, x));

           });
       }
    });

    $('#debug').mouseup(function (ev){
       if(ev.which === 1){
           rows.children('td').html('');
       }
    });

    $('#next_gen').click(function (){
        progress_generation();
    });

    function generate_notes(generateScale){
        var key_sel = $('#key_pitch').children('select')

        chord_prog = MusicUtils.get_rand_progression(key_sel.eq(0).val(), key_sel.eq(1).val() == "min" ? true : false, chords_to_play);
        chord_octave = Math.floor(Math.random() * 3) + 2; //From octave 2 to 4
        chords_played = 0;

        if(generateScale){
            scale = key_sel.eq(1).val() == "min" ? MusicUtils.get_min_scale(key_sel.eq(0).val() + '0') : MusicUtils.get_maj_scale(key_sel.eq(0).val() + '0');
        }
    }

    $('#key_pitch').children('select').change(() => generate_notes(true));

    $('#reload').click(() => generate_notes(false));

    $('#n_chords_sel').change(function (){
       chords_to_play = $(this).val();
       generate_notes(false);
    });


    $('.fa-volume-high, .fa-volume-xmark').click(function (){
        var affected_rows = $(this).parent().attr('id').split('_');

        for(var i = 1; i < affected_rows.length; i++){
            if(!isNaN(affected_rows[i])){
                rows.eq(affected_rows[i]).children('td').toggleClass('muted');
                if(affected_rows[i] == 4)
                    melody_only = !melody_only;
            }

        }
        $(this).toggleClass('fa-volume-xmark fa-volume-high');
    });

    $('input[name = "bpm_val"]').bind('input',function (){
        BPM = $(this).val();
        //Update Interval
        if($('#play_pause').hasClass('fa-pause')){
            clearInterval(inter);
            inter = setInterval(play_table, 60000 / BPM);
        }
    });


   /*  Debug
   $('.bar-item').click(function(){
        //console.log("ka[[[a");
        //music_test();
       //progress_generation();
       // play_note(null);
    });*/


    function get_left_col(this_col){
        return this_col - 1 >= 0 ? this_col - 1 : table_length -1;
    }

    function get_right_col(this_col){
        return this_col + 1 < table_length ? this_col + 1 : 0;
    }

    function get_upper_row(this_row){
        return this_row - 1 >= 0 ? this_row - 1 : table_height - 1;
    }

    function get_bottom_row(this_row){
        return this_row + 1 < table_height ? this_row + 1 : 0;
    }


    $('#lock_gen').click(function (){
        if(rows.children('td').hasClass('locked'))
            rows.children('td').removeClass('locked');
        else
            rows.each(function (){
                for(var x = 0; x < table_length; x ++){
                    var this_cell = $(this).children('td').eq(x);
                    if(this_cell.hasClass('selected'))
                        this_cell.addClass('locked');
                }
            });
    });

    $('#side-bar_shower').children('i').click(function (){
       if($(this).hasClass('fa-bars-staggered')){
           $(this).siblings('p').text('Music Sheet');
            $('.side-bar-col+div').css('display', 'none');
            $('.side-bar-col').css('display', 'block');
       }
       else{
           $(this).siblings('p').text('Music Bar');
           $('.side-bar-col+div').css('display', 'block');
           $('.side-bar-col').css('display', 'none');
       }

        $(this).toggleClass('fa-bars-staggered fa-table-cells');
    });


    //Media query in JS

    const trigger_media = window.matchMedia("(min-width: 1200px)");

    trigger_media.addEventListener('change', function (ev){
        if(ev.matches){

            $('.side-bar-col+div').css('display', '');
            $('.side-bar-col').css('display', '');

        }
        else {
            if($('#side-bar_shower').children('i').hasClass('fa-bars-staggered')){
                $('.side-bar-col+div').css('display', 'block');
                $('.side-bar-col').css('display', 'none');
            }
            else{
                $('.side-bar-col+div').css('display', 'none');
                $('.side-bar-col').css('display', 'block');
            }
        }
    })

    $('#add_col').click(function (){
       $('.music_tab').children('tr').append('<td></td>');
        table_length++;
        if(table_length == 14)
            $(this).css('display', 'none');
        $('#rem_col').css('display', 'inline-block');
    });

    $('#rem_col').click(function (){
        /*
            For safety, when removing columns, the music is stopped.
            This is necessary to avoid going of of the table bounds.
        */
        $('#stop_music').trigger('click');
        $('.music_tab').children('tr').each(function(){
           $(this).children('td').eq(table_length - 1).remove();
        });
        table_length--;

        if(table_length == 5)
            $(this).css('display', 'none');
        $('#add_col').css('display', 'inline-block');
    });

    function getMelodySample(){
        switch ($('#mel_instr').val()){
            case 'sax' : return Samples.sax_samp;
            case 'elec_guit' : return Samples.e_guitar_samp;
            case 'bass' : return Samples.bass_g_samp;
            case 'violin' : return Samples.violin_samp;
            default : return Samples.bass_g_samp;
        }

    }

    function getMelodyOctave(){
        switch ($('#mel_instr').val()){
            case 'sax' : return 4;
            case 'elec_guit' : return 3;
            case 'bass' : return 2;
            case 'violin' : return 4;
            default : return  2;
        }
    }



    /*
        Any live cell with fewer than two live neighbours dies, as if by underpopulation.
        Any live cell with two or three live neighbours lives on to the next generation.
        Any live cell with more than three live neighbours dies, as if by overpopulation.
        Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
     */

    function progress_generation(){

        rows.each(function (index){
            for(var x = 0; x < table_length; x ++){

                var c = count_cell_neighbours(index, x);
                var this_cell = $(this).children('td').eq(x);

                if(this_cell.hasClass('selected') && !this_cell.hasClass('locked')){
                    if(c < 2 || c > 3){  //underpopulation OR overpopulation
                        this_cell.addClass('to_remove');
                    }
               }
                else if(c == 3){ //reproduction
                    this_cell.addClass('to_add');
                }
            }

        });

        /*
            The current cell is not immediately removed/added after its neighbours are counted,
            since doing so would result in a wrong counting for the neighours cells.
            Instead, each cell is tagged with a class (to)add/remove which becomes effective
            only after each cell has been iterated.
            (This is the right behaviour expected from Conway's Game of Life).
         */

        rows.children('.to_remove').removeClass('selected to_remove');
        var to_add_ch = rows.children('.to_add');
        to_add_ch.addClass('selected');
        to_add_ch.removeClass('to_add');
    }

    function count_cell_neighbours(this_row, this_col){
        var count = 0;

        var up_row = get_upper_row(this_row);
        var bot_row = get_bottom_row(this_row);
        var right_col = get_right_col(this_col);
        var left_col = get_left_col(this_col);

        //console.log("["+this_row +", " + this_col + "]: up_row = " +  up_row + ", bot_row= " + bot_row + ", right_col= " + right_col + ", left_col= " + left_col);

        for(var x = left_col; x != get_right_col(right_col); x = get_right_col(x)){
            if(rows.eq(up_row).children('td').eq(x).hasClass('selected'))
                count++;
            if(x != this_col && rows.eq(this_row).children('td').eq(x).hasClass('selected'))
                count++;
            if(rows.eq(bot_row).children('td').eq(x).hasClass('selected'))
                count++;

        }

        return count;

    }


    var chords_played = 0;

    function play_note(row){

        /*
            For more, check the README.md file from the repository.
        */
        Tone.loaded().then(() => {

            switch(row){
                case table_height - 1 : Samples.bass_samp.triggerAttackRelease("C2", 2);break;
                case table_height - 2 : Samples.snare_samp.triggerAttackRelease("C2", 2);break;
                case table_height - 3 : Samples.conga_samp.triggerAttackRelease("C2", 2);break;
                case table_height - 4 : Samples.hihat_samp.triggerAttackRelease("C2", 2);break;
                case table_height - 5 : Samples.clap_samp.triggerAttackRelease("C2", 2);break;
                case table_height - 6 : {


                    var ch_sample = $('#chord_instr').val() == 'piano' ? Samples.piano_samp : Samples.casio_samp;


                    if(chord_prog[chords_played].is_minor)
                        MusicUtils.play_min_chord(ch_sample, chord_prog[chords_played].pitch + ($('#chord_instr').val() == 'piano' ? chord_octave : chord_octave - 1));
                    else
                        MusicUtils.play_maj_chord(ch_sample, chord_prog[chords_played].pitch + ($('#chord_instr').val() == 'piano' ? chord_octave : chord_octave - 1));
                    chords_played + 1 == chords_to_play ? chords_played = 0 : chords_played++;

                } break;

                case table_height - 7 : {
                    if(melody_only){
                        var note = Math.floor(Math.random() * 2);
                        //1 Octave = 12 Semitones
                        getMelodySample().triggerAttackRelease(Tone.Frequency(scale[note]).transpose(12 * getMelodyOctave()), 0.5)
                    }
                    else{
                        if(chord_prog[chords_played].is_minor)
                            getMelodySample().triggerAttackRelease(MusicUtils.get_min_triad(chord_prog[chords_played].pitch + (getMelodyOctave()-1))[0], 0.5);
                        else
                            getMelodySample().triggerAttackRelease(MusicUtils.get_maj_triad(chord_prog[chords_played].pitch + (getMelodyOctave()-1))[0], 0.5);
                    }

                } break;

                case table_height - 8 : {
                    if(melody_only){
                        var note = Math.floor(Math.random() * 2) + 2;
                        getMelodySample().triggerAttackRelease(Tone.Frequency(scale[note]).transpose(12 * getMelodyOctave()), 0.5)
                    }
                    else{
                        if(chord_prog[chords_played].is_minor)
                            getMelodySample().triggerAttackRelease(MusicUtils.get_min_triad(chord_prog[chords_played].pitch + getMelodyOctave())[0], 0.5);
                        else
                            getMelodySample().triggerAttackRelease(MusicUtils.get_maj_triad(chord_prog[chords_played].pitch + getMelodyOctave())[0], 0.5);
                    }

                } break;

                case table_height - 9 : {
                    if(melody_only){
                        var note = Math.floor(Math.random() * 2) + 4;
                        getMelodySample().triggerAttackRelease(Tone.Frequency(scale[note]).transpose(12 * getMelodyOctave()), 0.5)
                    }
                    else{
                        if(chord_prog[chords_played].is_minor)
                            getMelodySample().triggerAttackRelease(MusicUtils.get_min_triad(chord_prog[chords_played].pitch + getMelodyOctave())[1], 0.5);
                        else
                            getMelodySample().triggerAttackRelease(MusicUtils.get_maj_triad(chord_prog[chords_played].pitch + getMelodyOctave())[1], 0.5);
                    }
                } break;

                case table_height - 10 : {
                    if(melody_only){
                        var note = Math.floor(Math.random() * 2) + 6;
                        getMelodySample().triggerAttackRelease(Tone.Frequency(scale[note]).transpose(12 * getMelodyOctave()), 0.5)
                    }
                    else{
                        if(chord_prog[chords_played].is_minor)
                            getMelodySample().triggerAttackRelease(MusicUtils.get_min_triad(chord_prog[chords_played].pitch + getMelodyOctave())[2], 0.5);
                        else
                            getMelodySample().triggerAttackRelease(MusicUtils.get_maj_triad(chord_prog[chords_played].pitch + getMelodyOctave())[2], 0.5);
                    }

                } break;

                default: console.warn("Illegally added row not allowed");
            }
        });
    }

});