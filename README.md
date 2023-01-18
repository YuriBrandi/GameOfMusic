# Yuri's GameOfMusic
Automatic Web Music generator based on Conway's Game of Life.

https://www.yuribrandi.com/GameOfLife

![GameOfMusicScreenshot](https://user-images.githubusercontent.com/52039988/211019275-c19308d3-61ce-4df1-b2a3-6848f506de03.png)

## How does it work?
This implementation is fully developed in *JQuery/JavaScript* , and based on [Tone.js audio framework](https://tonejs.github.io/ "Go to Tone.js GitHub page") v14.7.77.

The user starts with some selected cells, chooses his **Key** and **BPM** (Beats Per Minute) of preference and hits the **Play** button. After every iteration the generation progresses following [Conway's Game of Life rules](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life).

Every row is a different instrument: the last 5 are percussive and the first 5 are musical. Specifically, the first 4 rows refer to the same instrument, and make up the melody part, while the 5th row plays the Chords with a different instrument.

## How are the Chords generated?
The Chords are generated though the use of the [Circle Of The Fifths](https://en.wikipedia.org/wiki/Circle_of_fifths).

![CircleOfTheFifthsImage](https://upload.wikimedia.org/wikipedia/commons/3/33/Circle_of_fifths_deluxe_4.svg)

The process is the following: 
1. The **Chord** corresponding to the **Key** is selected.
2. The **five neighbour Chords** are selected.

---
### Defining *neighbour Chords*:
The five neighbour Chords are the 2 on the *left/right* of the Key, and the 3 in *front/front-left/front-right* of the key.

### Example:
1. The user chooses *A min*.
2. *A min* will be the first Chord.
3. *D min*, *E min*, *F maj*, *C maj*, *G maj* are selected. 

---

Finally the *N* (chosen by the user) Chords are randomly picked up from the 6 generated and returnes as the final **Chord progression**.<br>
*Note: the key Chord is always picked as the first Chord of the progression.*

## How is melody created?
To make things easier the notes of melody part (composed of four rows) are extracted from the [triad](https://en.wikipedia.org/wiki/Triad_(music)) of the last played Chord. (*Note: Two rows both play the first note of the triad, but one does in a lower [octave](https://en.wikipedia.org/wiki/Octave) compared to the second*).

To make things less easy, when the user *mutes* the Chords row, the melody rows play notes from the *Key* scale *pseudo-randomly*

![cMajScale](https://user-images.githubusercontent.com/52039988/211051917-b17889fc-0591-4717-8683-3febce766dd1.jpg)


Since there are 8 notes composing a scale, every row (of the 4 rows composing the melody part) randomly chooses 1 of 2 playable notes.


### Example (C Major Scale):
The C Major Scale is consists of *C*, *D*, *E*, *F*, *G*, *A*, *B*, *C (+1 oct).*
So the 4 rows can respectively play:
1. *C* / *D*.
2. *E* / *F*.
3. *G* / *A*.
4. *B* / *C (+1 oct)*.

## How are the instruments created?
The instruments are made with **Tone.Sampler**, which given some audio files playing specific notes, fills the gaps between them creating a full working sample of notes to play.

*An example:*

``` JavaScript
violin_samp = new Tone.Sampler({
    urls: {
        "A3": "A3.ogg",
        "G4": "G4.ogg",
        "C5": "C5.ogg",
        "A6": "A6.ogg",
        "C7": "C7.ogg",
    },
    release: 1,
    baseUrl: "./js/samples/violin/",
}).toDestination();
```

For percussive instruments things are even simpler, since only one note is needed:
``` JavaScript
snare_samp = new Tone.Sampler({
    urls: {
        "C2": "snare.wav",
    },
    release: 1,
    baseUrl: "./js/samples/percussions/",
}).toDestination();
```

### Mixing
Finally, some samples of louder audio files are *naively* mixed by editing *sample.volume.value*

``` JavaScript
snare_samp.volume.value = -3;
```
## License
This software is distributed under the [GNU General Public License v3.0](LICENSE.md). 

![GPLv3Logo](https://www.gnu.org/graphics/gplv3-127x51.png)
