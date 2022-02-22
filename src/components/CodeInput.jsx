import { useTranslation } from 'react-i18next';

import alert from '../utils/alert';
import copy from '../utils/copy';
import fireEvent from '../utils/fireEvent';

export default ({ code, url }) => {
  const { t } = useTranslation();
  return (
    code && (
      <input
        type="text"
        readOnly
        value={code}
        class="idiom-code"
        onClick={(e) => {
          e.target.focus();
          e.target.select();
          copy(url || code, () => {
            alert(t('ui.copiedURL'));
          });
          fireEvent('Click: Share', {
            props: {
              type: 'idiom-code',
            },
          });
        }}
      />
    )
  );
};
