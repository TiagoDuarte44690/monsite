document.addEventListener('DOMContentLoaded', () => {
    // Sélection des éléments du DOM
    const cadran = document.querySelector('.cadran');
    const aiguille = document.querySelector('.aiguille');
    const bpmValue = document.querySelector('.bpm-value');
    const plusButton = document.querySelector('.btn-Plus');
    const minusButton = document.querySelector('.btn-Moins');
    const playButton = document.querySelector('.btn-Play');
    const cercleCentral = document.querySelector('.cercle-central');

    // Déclaration des variables audio
    var metronome1 = new Audio('/son/metronome1.mp3');
    var metronome234 = new Audio('/son/metronome234.mp3');

    let isPlaying = false;
    let metronomeInterval;
    const incrementStep = 1;
    let bpmDisplayValue = 0;
    let angleDeg = 0;

    const maxBpm = 100;
    const { left, top, width, height } = cadran.getBoundingClientRect();

    // Fonction pour jouer le son du métronome en fonction du BPM
    function Son(bpm) {
        if (bpm === 0) {
            // Arrêter le métronome et le son si le BPM est 0
            if (metronomeInterval) {
                clearInterval(metronomeInterval);
                metronomeInterval = null;
            }
            metronome1.pause();
            metronome1.currentTime = 0; // Remet le son à 0
            metronome234.pause();
            metronome234.currentTime = 0; // Remet le son à 0
            return;
        }

        // Calcul de l'intervalle en millisecondes en fonction du BPM
        const interval = 60000 / bpm; // Temps pour un battement complet (4 temps)
        const beatInterval = interval / 4; // Temps pour chaque temps

        // Initialiser un compteur de temps
        let beatCounter = 1;

        if (isPlaying) {
            if (metronomeInterval) {
                clearInterval(metronomeInterval);
            }

            metronomeInterval = setInterval(() => {
                // Choisir le son à jouer en fonction du temps
                let audioToPlay;
                if (beatCounter === 1) {
                    // Temps fort (1er temps)
                    audioToPlay = metronome1; // Son pour le temps fort
                } else {
                    // Temps faible (2ème, 3ème et 4ème temps)
                    audioToPlay = metronome234; // Son pour les temps faibles
                }

                audioToPlay.currentTime = 0; // Remet le son à 0 avant chaque lecture
                audioToPlay.play(); // Joue le son

                // Avancer au prochain temps
                if (beatCounter === 4) {
                    beatCounter = 0;
                }
                beatCounter++;
            }, beatInterval);
        } else {
            if (metronomeInterval) {
                clearInterval(metronomeInterval);
                metronomeInterval = null;
            }
            metronome1.pause(); // Arrête le son
            metronome234.pause(); // Arrête le son
        }
    }


    // Fonction pour incrémenter ou décrémenter le BPM
    function incrementBpm(direction) {
        if (direction === 'plus' && angleDeg < 280) {
            bpmDisplayValue += incrementStep;
        } else if (direction === 'moins' && angleDeg > 0) {
            bpmDisplayValue -= incrementStep;
        }
        bpmDisplayValue = Math.max(0, bpmDisplayValue); // Assure que BPM ne soit pas négatif
        bpmValue.textContent = `${bpmDisplayValue} bpm`;
        updateAiguille('bpm');
        Son(bpmDisplayValue); // Met à jour la fréquence du son lorsque les BPM changent
    }

    // Fonction pour mettre à jour l'aiguille et le BPM en fonction du type d'update
    function updateAiguille(updateType, event) {
        if (updateType === 'angle' && event) {
            // Calcul de l'angle en fonction de la position du clic
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
        Son(bpmDisplayValue); // Met à jour la fréquence du son lorsque les BPM changent
    }

    // Initialisation de l'aiguille avec la valeur de BPM actuelle
    updateAiguille('bpm');

    // Gestion des événements de clic pour les boutons et le cadran
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
                Son(bpmDisplayValue); // Met à jour la fréquence du son en fonction de l'état de lecture
                break;
            default:
                if (cadran.contains(event.target) && !cercleCentral.contains(event.target)) {
                    updateAiguille('angle', event);
                }
                break;
        }
    });
});
