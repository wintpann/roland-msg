const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const startDecoding = async () => {
  const file = prompt('Ссылка на файл:');

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
  api.activeBeatsChanged.on((...args) => console.log('LOOOG', args));
  api.playerFinished.on(async () => {
    countProgress.classList.add('hidden');
    await wait(500);
    countDone.classList.remove('hidden');
  })
};

const init = () => {
  const selectModal = document.querySelector('.select-modal');
  selectModal.classList.remove('hidden');

  document
    .querySelector('.select-file')
    .addEventListener('click', startDecoding);
};

init();
