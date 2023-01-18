
/*
    This file defines a Sampler for multiple music instruments.
    The sounds can be found in the ./samples folder.
    For more, please check the official Tone.js documentation: https://tonejs.github.io/.
*/
export const bass_samp = new Tone.Sampler({
    urls: {
        "C2": "kick.wav",
    },
    release: 1,
    baseUrl: "./js/samples/percussions/",
}).toDestination();

export const snare_samp = new Tone.Sampler({
    urls: {
        "C2": "snare.wav",
    },
    release: 1,
    baseUrl: "./js/samples/percussions/",
}).toDestination();
snare_samp.volume.value = -3;

export const conga_samp = new Tone.Sampler({
    urls: {
        "C2": "conga.wav",
    },
    release: 1,
    baseUrl: "./js/samples/percussions/",
}).toDestination();

export const hihat_samp = new Tone.Sampler({
    urls: {
        "C2": "hi-hat.wav",
    },
    release: 1,
    baseUrl: "./js/samples/percussions/",
}).toDestination();

export const clap_samp = new Tone.Sampler({
    urls: {
        "C2": "clap.wav",
    },
    release: 1,
    baseUrl: "./js/samples/percussions/",
}).toDestination();
clap_samp.volume.value = -3;

export const sax_samp = new Tone.Sampler({
    urls: {
        "C4": "C4.ogg",
        "A5": "A5.ogg",
        "C#3": "Cs3.ogg",
        "E3": "E3.ogg",
        "F#4": "Fs4.ogg",
        "G#3": "Gs3.ogg",
    },
    release: 1,
    baseUrl: "./js/samples/saxophone/",
}).toDestination();

export const violin_samp = new Tone.Sampler({
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

export const bass_g_samp = new Tone.Sampler({
    urls: {
        "A#1": "As1.ogg",
        "C#1": "Cs1.ogg",
        "E2": "E2.ogg",
        "G3": "G3.ogg",
    },
    release: 1,
    baseUrl: "./js/samples/bass-electric/",
}).toDestination();

export const e_guitar_samp = new Tone.Sampler({
    urls: {
        "A2" : "A2.ogg",
        "F#2": "Fs2.ogg",
        "C3": "C3.ogg",
        "D#3": "Ds3.ogg",
        "C4": "C4.ogg",
        "F#4": "Fs4.ogg",
        "A5": "A5.ogg",
    },
    release: 1,
    baseUrl: "./js/samples/guitar-electric/",
}).toDestination();

export const piano_samp = new Tone.Sampler({
    urls: {
        "C4": "C4.oga",
        "D#4": "Ds4.oga",
        "F#4": "Fs4.oga",
        "A4": "A4.oga",
    },
    release: 1,
    baseUrl: "./js/samples/piano/",
}).toDestination();

export const casio_samp = new Tone.Sampler({
    urls: {
        "A2": "A2.ogg",
        "C#2": "Cs2.ogg",
        "F#2": "Fs2.ogg",
        "G#1": "Gs1.ogg",
    },
    release: 1,
    baseUrl: "./js/samples/casio/",
}).toDestination();
