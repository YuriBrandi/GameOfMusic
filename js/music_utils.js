//Defines a minor chord from a root note.
export function play_min_chord(sample, note){
    sample.triggerAttackRelease([note, Tone.Frequency(note).transpose(3), Tone.Frequency(note).transpose(7)], 1);
}

//Defines a major chord from a root note.
export function play_maj_chord(sample, note){
    sample.triggerAttackRelease([note, Tone.Frequency(note).transpose(4), Tone.Frequency(note).transpose(7)], 1);
}

//Returns a minor chord from a root note.
export function get_min_triad(note){
    return [note, Tone.Frequency(note).transpose(3), Tone.Frequency(note).transpose(7)];
}

//Returns a major chord from a root note.
export function get_maj_triad(note){
    return [note, Tone.Frequency(note).transpose(4), Tone.Frequency(note).transpose(7)];
}

//Defines a minor scale from a root note.
export function get_min_scale(note){
    return [note, Tone.Frequency(note).transpose(2), Tone.Frequency(note).transpose(4), Tone.Frequency(note).transpose(5),
        Tone.Frequency(note).transpose(7), Tone.Frequency(note).transpose(9), Tone.Frequency(note).transpose(11), Tone.Frequency(note).transpose(12)];
}

//Defines a major scale from a root note.
export function get_maj_scale(note){
    return [note, Tone.Frequency(note).transpose(2), Tone.Frequency(note).transpose(3), Tone.Frequency(note).transpose(5),
        Tone.Frequency(note).transpose(7), Tone.Frequency(note).transpose(8), Tone.Frequency(note).transpose(10), Tone.Frequency(note).transpose(12)];
}

//Definition of the Circle of the Fifths
const maj_circle = ['C', 'G', 'D', 'A', 'E', 'B', 'F#',
    'C#', 'G#', 'D#', 'A#', 'F'];
const size = maj_circle.length;
// minor_circle = index + 3

export function get_rand_progression(key, is_min, number_ch){
    key = key.toUpperCase();
    var i = maj_circle.indexOf(key);
    /*var debug_chord_prog = {first: key, left : maj_circle[(i-1 % size + size) % size], right : maj_circle[(i+1 % size + size) % size],
                        front_first : maj_circle[(i+3 % size + size) % size], front_left : maj_circle[(i+3-1 % size + size) % size], front_right : maj_circle[(i+3+1 % size + size) % size]};*/

    //Getting all 6 chords from a key.
    if(!is_min)
        var full_chord_prog = [
            { pitch : key, is_minor : false},
            { pitch : maj_circle[(i-1 % size + size) % size], is_minor: false },
            { pitch : maj_circle[(i+1 % size + size) % size], is_minor: false },
            { pitch : maj_circle[(i+3 % size + size) % size], is_minor : true },
            { pitch : maj_circle[(i+3-1 % size + size) % size], is_minor : true},
            { pitch : maj_circle[(i+3+1 % size + size) % size], is_minor : true }
        ];
    else
        var full_chord_prog = [
            { pitch : key, is_minor : true},
            { pitch : maj_circle[(i-1 % size + size) % size], is_minor: true },
            { pitch : maj_circle[(i+1 % size + size) % size], is_minor: true },
            { pitch : maj_circle[(i-3 % size + size) % size], is_minor : false },
            { pitch : maj_circle[(i-3-1 % size + size) % size], is_minor : false },
            { pitch : maj_circle[(i-3+1 % size + size) % size], is_minor : false }
        ];

    if(number_ch < 1 || number_ch > full_chord_prog.length || number_ch === undefined)
        console.error("number of chords invalid");
    else{
        var chord_prog = [full_chord_prog[0]];
        full_chord_prog.splice(0, 1);

        for(var i = 0; i < number_ch - 1; i++){
            //Returns a number between 0 and full_chord_prog.length (excluded).
            var rand_ind = Math.floor(Math.random() * full_chord_prog.length);
            chord_prog.push(full_chord_prog[rand_ind]);
            full_chord_prog.splice(rand_ind, 1);
        }
        console.log("Generated progression: " + JSON.stringify(chord_prog));
        return chord_prog;
    }

}