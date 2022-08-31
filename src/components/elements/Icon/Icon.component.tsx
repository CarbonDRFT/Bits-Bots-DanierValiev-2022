import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import type { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';

library.add(fas);
library.add(fab);

type Props = {
  name: IconName;
  type: IconPrefix;
};

const Icon = ({ name, type }: Props): JSX.Element =>
  (
    <div className="icon">
      <FontAwesomeIcon icon={[type, name]} />
    </div>
  );

export default Icon;
