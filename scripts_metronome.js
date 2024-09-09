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
    //let metronomeInterval;
    const incrementStep = 1;
    let bpmDisplayValue = 0;
    let angleDeg = 0;

    const maxBpm = 1000;
    const { left, top, width, height } = cadran.getBoundingClientRect();

    // Fonction pour jouer le son du métronome en fonction du BPM
    function Son(bpm) {
        let isPlaying = false;
        let intervalId = null; // Pour stocker l'identifiant de l'intervalle
        let count = 0;

        // Fonction pour démarrer le métronome
        function startMetronome(bpm) {
            if (bpm <= 0) {
                console.error('BPM doit être supérieur à 0');
                return;
            }

            // Calculer l'intervalle entre les battements
            const interval = 60000 / bpm;

            // Assurez-vous que le métronome n'est pas déjà en cours
            if (isPlaying) {
                stopMetronome();
            }

            // Mettre à jour l'état du métronome
            isPlaying = true;

            // Démarrer l'intervalle
            intervalId = setInterval(() => {
                count++;
                if (count > 5) count = 1;

                // Jouer ou mettre en pause les sons en fonction du compteur
                if (count === 1) {
                    metronome1.play();       // Jouer le son du premier temps
                    metronome234.pause();    // Mettre en pause le son des temps suivants
                } else {
                    metronome234.play();     // Jouer le son des temps suivants
                    metronome1.pause();      // Mettre en pause le son du premier temps
                }
            }, interval);
        }

        // Fonction pour arrêter le métronome
        function stopMetronome() {
            if (isPlaying) {
                clearInterval(intervalId); // Arrêter l'intervalle
                intervalId = null; // Réinitialiser l'identifiant de l'intervalle
                isPlaying = false;

                // Arrêter les sons
                metronome1.pause();
                metronome234.pause();
            }
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
