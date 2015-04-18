WAV files used as source.

Opus files encoded using the following:
`opusenc --bitrate 96 file.wav file.opus`

MP3 files encided using the following:
`ffmpeg -i file.wav -codec:a libmp3lame -qscale:a 2 file.mp3`
