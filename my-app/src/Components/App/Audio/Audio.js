import ReactAudioPlayer from 'react-audio-player';

function Audio(props) {
    return (
        <ReactAudioPlayer
        className='audio-player'
        src = {props.audioFile}
        onPlay={props.handleAudio}
        controls
        />
    )
}

export default Audio;
