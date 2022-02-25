import { toJpeg } from 'html-to-image';
import { useEffect, useRef, useState } from 'preact/hooks';
import { useTranslation } from 'react-i18next';

import fireEvent from '../utils/fireEvent';
import prefersColorSchemeSupported from '../utils/prefersColorSchemeSupported';
import DownloadIcon from './DownloadIcon';

export default ({ header, footer, boardStates, id }) => {
  const { t } = useTranslation();
  const imageRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const imageOpts = {
    canvasWidth: 1080,
    canvasHeight: 1080,
    quality: 0.5,
  };

  // Update image when light/dark mode kicks in
  const [mediaChanged, setMediaChanged] = useState();
  useEffect(() => {
    if (!prefersColorSchemeSupported) return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const colorSchemeChange = (event) => {
      setMediaChanged(event.matches);
    };
    try {
      media.addEventListener('change', colorSchemeChange);
    } catch (e) {
      media.addListener(colorSchemeChange);
    }
    return () => {
      try {
        media.removeEventListener('change', colorSchemeChange);
      } catch (e) {
        media.removeListener(colorSchemeChange);
      }
    };
  });

  useEffect(() => {
    let isSubscribed = true;
    setImageSrc(null);
    toJpeg(imageRef.current, imageOpts)
      .then((dataURL) => {
        if (isSubscribed) setImageSrc(dataURL);
      })
      .catch((e) => {
        if (isSubscribed) setImageSrc(null);
      });
    return () => {
      isSubscribed = false;
    };
  }, [boardStates, id, mediaChanged]);

  const fileName = `chengyu-wordle-${id}.jpg`;

  return (
    <>
      {!!imageSrc && (
        <a
          id="share-image-button"
          class="button"
          href={imageSrc}
          download={fileName}
          target="_blank"
          onClick={() => {
            fireEvent('Click: Share', {
              props: {
                type: 'image',
              },
            });
          }}
        >
          {t('common.image')} <DownloadIcon width="12" height="12" />
        </a>
      )}
      <div id="share-image-container">
        <div id="share-image" ref={imageRef}>
          <p class="header">
            <b>{header}</b>
          </p>
          <div class="board">
            {boardStates.map((row) => {
              return (
                <div>
                  {row.map((letter) => {
                    return <span class={`tile ${letter}`} />;
                  })}
                </div>
              );
            })}
          </div>
          <p class="footer">{footer}</p>
        </div>
      </div>
    </>
  );
};
