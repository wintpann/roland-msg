const symbolsMap = new Map([
  [1, ' '],
  [2, 'о'],
  [3, 'е'],
  [4, 'а'],
  [5, 'и'],
  [6, 'н'],
  [7, 'т'],
  [8, 'с'],
  [9, 'р'],
  [10, 'в'],
  [11, 'л'],
  [12, 'к'],
  [13, 'м'],
  [14, 'д'],
  [15, 'п'],
  [16, 'у'],
  [17, 'я'],
  [18, 'ы'],
  [19, 'ь'],
  [20, 'г'],
  [21, 'з'],
  [22, 'б'],
  [23, 'ч'],
  [24, 'й'],
  [25, 'х'],
  [26, 'ж'],
  [27, 'ш'],
  [28, 'ю'],
  [29, 'ц'],
  [30, 'щ'],
  [31, 'э'],
  [32, 'ф'],
  [33, 'ъ'],
  [34, 'ё'],
  [35, '.'],
  [36, ','],
  [37, '!'],
  [38, '?'],
  [39, ':'],
  [40, '-'],
]);

const decoder = {
  lastNote: 0,
  counter: 0,
  acc: '',
  collect(notes) {
    if (notes.length === 1) {
      this.counter +=
        this.lastNote === 0 ? 0 : Math.abs(this.lastNote - notes[0]);
      this.lastNote = notes[0];
    } else if (Math.abs(notes[0] - notes[1]) === 12) {
      this.counter = 0;
      this.lastNote = 0;
    } else {
      this.acc += symbolsMap.get(this.counter) || '';
      this.counter = 0;
      this.lastNote = 0;
    }
  },
  flush() {
    const temp = this.acc;
    this.acc = '';
    return temp;
  },
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const startDecoding = async () => {
  const file = prompt('Ссылка на файл:');
  if (!file) {
    return;
  }

  const api = new alphaTab.AlphaTabApi(document.querySelector('.at-main'), {
    file,
    player: {
      enablePlayer: true,
      soundFont:
        'https://raw.githubusercontent.com/wintpann/coolstuff/main/piano.soundfont.sf2',
      scrollElement: document.querySelector('.at-viewport'),
    },
    display: {
      resources: {
        staffLineColor: 'rgba(125,125,125,0.7)',
        barSeparatorColor: '#5f8ce0',
        barNumberColor: '#cbcbcb',
        mainGlyphColor: '#9f9f9f',
      },
    },
  });

  document.querySelector('.select-file').classList.add('hidden');
  document.querySelector('.select-file').style.pointerEvents = 'none';

  await wait(500);
  document.querySelector('.select-file').remove();

  const atModal = document.querySelector('.at-modal');
  atModal.classList.remove('hidden');
  const decodeModal = document.querySelector('.decode-modal');
  decodeModal.classList.remove('hidden');

  await wait(500);
  const count3 = document.querySelector('.count-3');
  const count2 = document.querySelector('.count-2');
  const count1 = document.querySelector('.count-1');
  const countDone = document.querySelector('.count-done');
  const countProgress = document.querySelector('.count-progress');
  const result = document.querySelector('.result');

  count3.classList.remove('hidden');
  await wait(500);
  count3.classList.add('hidden');
  await wait(500);
  count2.classList.remove('hidden');
  await wait(500);
  count2.classList.add('hidden');
  await wait(500);
  count1.classList.remove('hidden');
  await wait(500);
  count1.classList.add('hidden');
  await wait(500);
  countProgress.classList.remove('hidden');

  api.play();
  api.activeBeatsChanged.on(({ activeBeats: [head] }) => {
    const notes = Array.from(head.noteValueLookup.keys());
    if (notes.length > 0) {
      decoder.collect(notes);
    }
    result.textContent += decoder.flush();
  });
  api.playerFinished.on(async () => {
    countProgress.classList.add('hidden');
    await wait(500);
    countDone.classList.remove('hidden');
  });
};

const init = () => {
  const selectModal = document.querySelector('.select-modal');
  selectModal.classList.remove('hidden');

  document
    .querySelector('.select-file')
    .addEventListener('click', startDecoding);
};

init();
