<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Métronome avec Triangle</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: #f0f0f0;
            z-index: 1;
        }

        .container {
            position: relative;
            z-index: 2;
        }

        .cadran {
            position: relative;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            overflow: hidden;
            cursor: crosshair;
            z-index: 3;
        }

        .degrade {
            position: absolute;
            width: 100%;
            height: 100%;
            background: linear-gradient(to right, green, red);
            z-index: 4;
        }

        .aiguille {
            position: absolute;
            width: 2px;
            height: 100px;
            background: black;
            top: 0;
            left: 50%;
            transform-origin: bottom center;
            transform: rotate(0deg);
            z-index: 5;
        }

        .cercle-central {
            position: absolute;
            width: 150px;
            height: 150px;
            background: black;
            border-radius: 50%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 6;
        }

        .bpm-value {
        position: absolute; /* Permet le positionnement absolu */
        top: 35%; /* Ajustez selon vos besoins */
        left: 50%; /* Ajustez selon vos besoins */
        transform: translate(-50%, -50%); /* Centre l'élément par rapport à son point d'ancrage */
        font-size: 20px;
        font-weight: bold;
        color: white;
        z-index: 9;
        }

        .triangle {
            position: absolute;
            width: 0;
            height: 0;
            border-left: 100px solid transparent;
            border-right: 100px solid transparent;
            border-bottom: 120px solid black;
            bottom: -30%;
            left: 50%;
            transform: translateX(-50%);
            z-index: 8;
        }

        .button-container1 {
            position: absolute;
            top: 55%;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 30px;
            z-index: 10;
        }

        .button-container2 {
            position: absolute;
            top: 78%;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 10px;
            z-index: 10;
        }

        .btn1 {
        width: 30px;
        height: 30px;
        font-size: 15px;
        font-weight: 700;
        cursor: pointer;
        z-index: 11;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        }

        .btn2 {
        width: 65px;
        height: 30px;
        font-size: 10px;
        font-weight: 700;
        cursor: pointer;
        z-index: 11;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        }

    </style>
</head>
<body>
    <div class="container">
        <div class="cadran"
            onmousedown="startDragging(event)"
            onmouseup="stopDragging()"
            onmousemove="drag(event)">
            <div class="degrade"></div>
            <div class="aiguille"></div>
            <div class="cercle-central">
                <div class="bpm-value">144 bpm</div>
                <div class="triangle"></div>
            </div>
        </div>
        <div class="button-container1">
            <button class="btn1" onmousedown="startChangingBpm(-1)" onmouseup="stopChangingBpm()" onmouseleave="stopChangingBpm()">-</button>
            <button class="btn1" onmousedown="startChangingBpm(1)" onmouseup="stopChangingBpm()" onmouseleave="stopChangingBpm()">+</button>
        </div>

        <div class="button-container2">
            <button class="btn2" onclick="toggleMetronome()">Play</button>
        </div>
    </div>

    <script>
        const cadran = document.querySelector('.cadran');
        const aiguille = document.querySelector('.aiguille');
        const bpmValue = document.querySelector('.bpm-value');
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        let isDragging = false;
        let currentBpm = 144;
        let changeInterval, metronomeInterval;
        let changeDirection = 0;
        let isPlaying = false;

        function startDragging(event) {
            isDragging = true;
            updateAiguille(event);
        }

        function stopDragging() {
            isDragging = false;
        }

        function drag(event) {
            if (isDragging) updateAiguille(event);
        }

        function updateAiguille(event) {
            const { left, top, width, height } = cadran.getBoundingClientRect();
            const [centerX, centerY] = [left + width / 2, top + height / 2];
            const [deltaX, deltaY] = [event.clientX - centerX, event.clientY - centerY];
            let angleDeg = (Math.atan2(deltaY, deltaX) * 180 / Math.PI + 360) % 360;

            if (angleDeg <= 55 || angleDeg >= 126) {
                let bpm = angleDeg > 126 ? angleDeg - 126 : angleDeg + 234;
                currentBpm = Math.min(Math.round(bpm), 286);
                aiguille.style.transform = `rotate(${angleDeg + 90}deg)`;
                bpmValue.textContent = `${currentBpm} bpm`;
                updateMetronome();
            }
        }

        function changeBpm() {
            currentBpm = Math.max(0, Math.min(currentBpm + changeDirection, 286));
            const angleDeg = (currentBpm + 126) % 360;
            aiguille.style.transform = `rotate(${angleDeg + 90}deg)`;
            bpmValue.textContent = `${currentBpm} bpm`;
            updateMetronome();
        }

        function startChangingBpm(direction) {
            changeDirection = direction;
            changeBpm();

            let initialTime = Date.now();
            let maxIncrement = 10;

            changeInterval = setInterval(() => {
                const elapsedTime = (Date.now() - initialTime) / 1000;
                let currentIncrement = Math.min(1 + Math.floor(elapsedTime / 0.7) * 2, maxIncrement);

                for (let i = 0; i < currentIncrement; i++) {
                    if ((direction === 1 && currentBpm >= 286) || (direction === -1 && currentBpm <= 0)) {
                        clearInterval(changeInterval);
                        return;
                    }
                    changeBpm();
                }

                if (currentIncrement >= maxIncrement) {
                    clearInterval(changeInterval);
                    changeInterval = setInterval(() => {
                        if ((direction === 1 && currentBpm >= 286) || (direction === -1 && currentBpm <= 0)) {
                            clearInterval(changeInterval);
                        } else {
                            changeBpm();
                        }
                    }, 50);
                }
            }, 100);
        }

        function stopChangingBpm() {
            clearInterval(changeInterval);
            changeDirection = 0;
        }

        function updateMetronome() {
            if (metronomeInterval) clearInterval(metronomeInterval);
            if (currentBpm > 0 && isPlaying) {
                const interval = 60000 / currentBpm;
                metronomeInterval = setInterval(playClick, interval);
            }
        }

        function playClick() {
            const oscillator = audioCtx.createOscillator();
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(1000, audioCtx.currentTime);
            oscillator.connect(audioCtx.destination);
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.1);
        }

        function toggleMetronome() {
            isPlaying = !isPlaying;
            if (isPlaying) {
                updateMetronome();
                document.querySelector('.btn2').textContent = 'Stop';
            } else {
                clearInterval(metronomeInterval);
                metronomeInterval = null;
                document.querySelector('.btn2').textContent = 'Play';
            }
        }
    </script>
</body>
</html>
