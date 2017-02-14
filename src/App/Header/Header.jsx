import React from 'react';
import {observer} from 'mobx-react';
import {AppBar} from 'react-toolbox/lib/app_bar';
import {InputRTL} from "../../shared/react-toolbox-rtl/InputRTL.jsx";

import style from "./style.scss";

const Header = observer(({title, filter, updateFilter}) =>
    <AppBar title={title} theme={style}>
        <InputRTL type='text' value={filter} onChange={updateFilter} theme={style} icon="search"/>
        <div className={style.info}>מידע נוסף</div>
    </AppBar>
);

export default Header;