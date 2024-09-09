document.addEventListener('DOMContentLoaded', () => {
    const cadran = document.querySelector('.cadran');
    const aiguille = document.querySelector('.aiguille');
    const bpmValue = document.querySelector('.bpm-value');
    const plusButton = document.querySelector('.btn-Plus');
    const minusButton = document.querySelector('.btn-Moins');
    const playButton = document.querySelector('.btn-Play');
    const cercleCentral = document.querySelector('.cercle-central');
    //const metronomeSound = document.getElementById('metronome-sound'); // Ajout de la rÃ©fÃ©rence audio

    let isPlaying = false;
    let metronomeInterval;
    const incrementStep = 1;
    let bpmDisplayValue = 0;
    let angleDeg = 0;

    const maxBpm = 1000;
    const { left, top, width, height } = cadran.getBoundingClientRect();

    function Son(bpm) {
        /*
        if (bpm === 0) {
            // ArrÃªter le mÃ©tronome et le son si le BPM est 0
            if (metronomeInterval) {
                clearInterval(metronomeInterval);
                metronomeInterval = null;
            }
            metronomeSound.pause();
            metronomeSound.currentTime = 0; // Rewind le son Ã  0
            return;
        }

        // Calcul de l'intervalle en millisecondes
        const interval = 60000 / bpm;

        if (isPlaying) {
            if (metronomeInterval) {
                clearInterval(metronomeInterval);
            }
            metronomeInterval = setInterval(() => {
                metronomeSound.currentTime = 0; // Rewind le son Ã  chaque lecture
                metronomeSound.play(); // Joue le son
            }, interval);
        } else {
            if (metronomeInterval) {
                clearInterval(metronomeInterval);
                metronomeInterval = null;
            }
            metronomeSound.pause(); // ArrÃªte le son
        }
            */
    }

    function incrementBpm(direction) {
        if (direction === 'plus' && angleDeg < 280) {
            bpmDisplayValue += incrementStep;
        } else if (direction === 'moins' && angleDeg > 0) {
            bpmDisplayValue -= incrementStep;
        }
        bpmDisplayValue = Math.max(0, bpmDisplayValue); // Assure que BPM ne soit pas nÃ©gatif
        bpmValue.textContent = `${bpmDisplayValue} bpm`;
        updateAiguille('bpm');
        Son(bpmDisplayValue); // Met Ã  jour la frÃ©quence du son lorsque les BPM changent
    }

    function updateAiguille(updateType, event) {
        if (updateType === 'angle' && event) {
            const calculAngle = (Math.atan2(event.clientY - (top + height / 2), event.clientX - (left + width / 2)) * 180 / Math.PI + 230) % 360;
            if (calculAngle < 280) {
                angleDeg = calculAngle;
            }
            bpmDisplayValue = Math.round((((angleDeg) / 280) * maxBpm));
        }
        if (updateType === 'bpm') {
            angleDeg = (bpmDisplayValue * (280 / maxBpm));
        }
        aiguille.style.transform = `rotate(${angleDeg + 220}deg)`;
        bpmValue.textContent = `${bpmDisplayValue} bpm`;
        Son(bpmDisplayValue); // Met Ã  jour la frÃ©quence du son lorsque les BPM changent
    }

    //-------------------------------------------------------------------------------

    updateAiguille('bpm');

    document.addEventListener('click', function (event) {
        switch (event.target) {
            case plusButton:
                incrementBpm('plus');
                break;
            case minusButton:
                incrementBpm('moins');
                break;
            case playButton:
                isPlaying = !isPlaying;
                playButton.textContent = isPlaying ? 'Stop' : 'Play';
                Son(bpmDisplayValue); // Met Ã  jour la frÃ©quence du son en fonction de l'Ã©tat de lecture
                break;
            default:
                if (cadran.contains(event.target) && !cercleCentral.contains(event.target)) {
                    updateAiguille('angle', event);
                }
                break;
        }
    });
});
